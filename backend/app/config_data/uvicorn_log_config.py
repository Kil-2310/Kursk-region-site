from uvicorn.config import LOGGING_CONFIG

CUSTOM_LOGGING_CONFIG = LOGGING_CONFIG.copy()

CUSTOM_LOGGING_CONFIG["formatters"]["access"]["fmt"] = (
    '%(asctime)s | %(levelname)-8s | %(client_addr)s | '
    '"%(request_line)s" | %(status_code)s'
)

CUSTOM_LOGGING_CONFIG["formatters"]["default"]["fmt"] = (
    '%(asctime)s | %(levelname)-8s | %(name)s | %(message)s'
)