FROM python:3.11-slim

WORKDIR docs/

RUN apt-get update && apt-get install -y build-essential libffi-dev
RUN pip install sphinx sphinx-press-theme sphinx-autobuild

EXPOSE 8000

CMD ["sphinx-autobuild", ".", "_build/html", "--host", "0.0.0.0", "--port", "8000"]