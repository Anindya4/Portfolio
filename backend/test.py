import asyncio
import httpx


async def test():
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": "2x0000000000000000000000000000000AA",
                "response": "test",
            },
        )

        print(response.status_code)
        print(response.text)


asyncio.run(test())