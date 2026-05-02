from ..base_schemas import ServerBoolAnswer


class CreateCommentResponse(ServerBoolAnswer):
    media_id: int
    file_name: str
    file_url: str
