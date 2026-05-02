import uvicorn

from app.loader import create_app
from app.config_data import CUSTOM_LOGGING_CONFIG

app = create_app()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True, log_config=CUSTOM_LOGGING_CONFIG)
