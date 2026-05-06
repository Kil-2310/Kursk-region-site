from redis.http.http_client import HttpResponse

from ..config_data import IS_TESTING


def cookie_configuration(
    response: HttpResponse, key: str, value: str, age: int = 900
) -> HttpResponse:
    """Конфигурация cookie"""

    response.set_cookie(
        key=key,
        value=value,
        httponly=True,
        secure=False if IS_TESTING else True,
        samesite="lax",
        max_age=age,
    )

    return response
