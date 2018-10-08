## Router File

Add "create_post" to permission table.

```
[
  {
    "domain": "http://localhost:3000",
    "uri": "/posts",
    "method": "get",
    "permission": []
  },{
    "domain": "http://localhost:3000",
    "uri": "/posts",
    "method": "post",
    "permission": [
        "create_post"
    ]
  }
]

```