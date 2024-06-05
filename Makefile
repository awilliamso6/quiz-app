
# Variables
VENV_DIR = venv
REQUIREMENTS_FILE = api/requirements.txt
REACT_APP_DIR = react

.PHONY: build clean api-build react-build

api-build:
	@echo "Creating Python virtual environment..."
	python3 -m venv $(VENV_DIR)
	@echo "Installing Python dependencies from $(REQUIREMENTS_FILE)..."
	$(VENV_DIR)/bin/pip install -r $(REQUIREMENTS_FILE)

react-build:
	@echo "Installing npm dependencies in ./$(REACT_APP_DIR)"
	cd $(REACT_APP_DIR) &&  npm install

build: api-build react-build

clean:
	@echo "Removing virtual environment..."
	rm -rf $(VENV_DIR)
	@echo "Removing node_modules..."
	rm -rf $(REACT_APP_DIR)/node_modules