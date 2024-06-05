#!/bin/bash

API_LOG="fastapi_app.log"
REACT_LOG="react_app.log"

VENV_DIR="venv"

activate_venv() {
    if [ -d "$VENV_DIR" ]; then
        echo "Activating virtual environment..."
        source "$VENV_DIR/bin/activate"
    else
        echo "Virtual environment not found in $VENV_DIR. Run 'make build'."
        exit 1
    fi
}

start_api_app() {
    echo "Starting FastAPI app..."
    activate_venv
    cd api
    fastapi dev main.py > ../logs/$API_LOG 2>&1 &
    API_PID=$!
    cd ..
}

start_react_app() {
    echo "Starting React app..."
    cd react
    npm start > ../logs/$REACT_LOG 2>&1 &
    REACT_PID=$!
    cd ..
}

cleanup() {
    echo "Stopping FastAPI app..."
    kill $API_PID
    echo "Stopping React app..."
    kill $REACT_PID
}
trap cleanup SIGINT SIGTERM

cd ..
start_api_app
start_react_app

wait $API_PID $REACT_PID