from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi


def custom_openapi(app: FastAPI):
    def custom_openapi_function():
        if app.openapi_schema:
            return app.openapi_schema

        openapi_schema = get_openapi(
            title=app.title,
            version=app.version,
            description=app.description,
            routes=app.routes,
        )

        openapi_schema["components"]["securitySchemes"] = {
            "CSRFToken": {
                "type": "apiKey",
                "in": "header",
                "name": "X-CSRF-Token",
                "description": "CSRF токен. Получите его из GET /api/csrf_token",
            }
        }

        for path in openapi_schema["paths"].values():
            for method in path.values():
                if "security" not in method:
                    method["security"] = []
                method["security"].append({"CSRFToken": []})

        app.openapi_schema = openapi_schema
        return app.openapi_schema

    app.openapi = custom_openapi_function
