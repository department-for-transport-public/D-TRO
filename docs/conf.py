# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Digital Traffic Regulation Orders - Data Model User Guide'
copyright = '2025, Department for Transport'
author = 'Department for Transport'
release = 'v3.4.1'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = []

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'press'
html_static_path = ['_static']
html_css_files = ['custom.css']

numfig = True
numfig_format = {
     'figure': 'Figure %s',
     'code-block': 'Listing %s',
}

html_logo = "_static/images/logo.png"
html_show_sphinx = False
