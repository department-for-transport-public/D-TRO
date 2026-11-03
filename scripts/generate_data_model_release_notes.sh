#!/usr/bin/env bash
set -euo pipefail

TEMPLATE="Release Notes/Data Model/TEMPLATE.md"

if [[ ! -f "$TEMPLATE" ]]; then
    echo "Error: $TEMPLATE not found in the current directory."
    exit 1
fi

read -rp "Version number (e.g. v4.0.0): " VERSION
read -rp "Integration release date (YYYY-MM-DD): " INTEGRATION_INPUT
read -rp "Production release date (YYYY-MM-DD): " PRODUCTION_INPUT

# Add leading v if omitted.
if [[ ! "$VERSION" =~ ^v ]]; then
    VERSION="v$VERSION"
fi

# Validate semantic version.
if [[ ! "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: version must look like v4.0.0 or 4.0.0."
    exit 1
fi

validate_date() {
    local input=$1

    # Validate basic YYYY-MM-DD structure.
    if [[ ! "$input" =~ ^([0-9]{4})-([0-9]{2})-([0-9]{2})$ ]]; then
        return 1
    fi

    local year="${BASH_REMATCH[1]}"
    local month="${BASH_REMATCH[2]}"
    local day="${BASH_REMATCH[3]}"

    # Strip leading zero so Bash doesn't interpret it as octal.
    month=$((10#$month))
    day=$((10#$day))

    if (( month < 1 || month > 12 || day < 1 )); then
        return 1
    fi

    local max_day

    case "$month" in
        1|3|5|7|8|10|12)
            max_day=31
            ;;
        4|6|9|11)
            max_day=30
            ;;
        2)
            # Leap year calculation.
            if (( (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0) )); then
                max_day=29
            else
                max_day=28
            fi
            ;;
    esac

    (( day <= max_day ))
}

for release_date in "$INTEGRATION_INPUT" "$PRODUCTION_INPUT"; do
    if ! validate_date "$release_date"; then
        echo "Error: invalid date '$release_date'. Use YYYY-MM-DD."
        exit 1
    fi
done

ordinal_suffix() {
    local day=$((10#$1))

    if (( day % 100 >= 11 && day % 100 <= 13 )); then
        echo "th"
        return
    fi

    case $((day % 10)) in
        1) echo "st" ;;
        2) echo "nd" ;;
        3) echo "rd" ;;
        *) echo "th" ;;
    esac
}

format_date() {
    local input=$1

    local year="${input:0:4}"
    local month=$((10#${input:5:2}))
    local day=$((10#${input:8:2}))

    local months=(
        ""
        "January"
        "February"
        "March"
        "April"
        "May"
        "June"
        "July"
        "August"
        "September"
        "October"
        "November"
        "December"
    )

    local suffix
    suffix=$(ordinal_suffix "$day")

    echo "${day}<sup>${suffix}</sup> ${months[$month]} ${year}"
}

badge_date() {
    local input=$1

    local year="${input:0:4}"
    local month=$((10#${input:5:2}))
    local day=$((10#${input:8:2}))

    local months=(
        ""
        "January"
        "February"
        "March"
        "April"
        "May"
        "June"
        "July"
        "August"
        "September"
        "October"
        "November"
        "December"
    )

    local suffix
    suffix=$(ordinal_suffix "$day")

    echo "${day}${suffix}%20${months[$month]}%20${year}"
}

INTEGRATION_DATE=$(format_date "$INTEGRATION_INPUT")
PRODUCTION_DATE=$(format_date "$PRODUCTION_INPUT")

INTEGRATION_BADGE_DATE=$(badge_date "$INTEGRATION_INPUT")
PRODUCTION_BADGE_DATE=$(badge_date "$PRODUCTION_INPUT")

# Determine release type from semantic version.
SEMVER="${VERSION#v}"
IFS='.' read -r MAJOR MINOR PATCH <<< "$SEMVER"

if (( 10#$PATCH > 0 )); then
    RELEASE_TYPE="patch release"
elif (( 10#$MINOR > 0 )); then
    RELEASE_TYPE="minor release"
else
    RELEASE_TYPE="major release"
fi

OUTPUT="Release Notes/Data Model/${VERSION}.md"

sed \
    -e "s|{{VERSION}}|${VERSION}|g" \
    -e "s|{{INTEGRATION_DATE}}|${INTEGRATION_DATE}|g" \
    -e "s|{{PRODUCTION_DATE}}|${PRODUCTION_DATE}|g" \
    -e "s|{{INTEGRATION_BADGE_DATE}}|${INTEGRATION_BADGE_DATE}|g" \
    -e "s|{{PRODUCTION_BADGE_DATE}}|${PRODUCTION_BADGE_DATE}|g" \
    -e "s|{{RELEASE_TYPE}}|${RELEASE_TYPE}|g" \
    "$TEMPLATE" > "$OUTPUT"

echo
echo "Created: $OUTPUT"
echo "Integration: $INTEGRATION_DATE"
echo "Production:  $PRODUCTION_DATE"
echo
echo "Now edit the Changelog section."