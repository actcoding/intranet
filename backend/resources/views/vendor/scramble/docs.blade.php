<!doctype html>
<html lang="en">

<head>
    <title>{{ config('app.name') }} - API Docs</title>

    <meta charset="utf-8" />
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    />

    <link rel="shortcut icon" href="{{ url('logo.png') }}" type="image/x-icon">

    <style>
        :root {
            --scalar-custom-header-height: 50px;
        }

        .custom-header {
            height: var(--scalar-custom-header-height);
            background-color: var(--scalar-background-1);
            color: var(--scalar-color-1);
            font-size: var(--scalar-font-size-2);
            padding: 0 18px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0px 4px 8px -3px var(--scalar-border-color);
        }
        .custom-header,
        .custom-header nav {
            display: flex;
            align-items: center;
            gap: 18px;
        }
        .custom-header a:hover {
            color: var(--scalar-color-2);
        }
        .custom-header img {
            height: inherit;
            padding: 8px;
        }

        .flex-1 {
            flex: 1 0 auto;
        }
    </style>
</head>

<body>

    <header class="custom-header scalar-app">
        <img src="{{ url('logo.png') }}" alt="Logo">
        <b>
            {{ config('app.name') }} - API Docs
        </b>
        {{-- <div class="flex-1"></div>
        <nav>
            <a href="https://twitter.com/scalar">Twitter</a>
            <a href="https://discord.gg/8HeZcRGPFS">Discord</a>
        </nav> --}}
    </header>

    <script
        id="api-reference"
        data-url="{{ route('scramble.docs.document') }}"></script>

    <script>
        var configuration = {
            theme: 'purple',
        }

        document.getElementById('api-reference').dataset.configuration =
            JSON.stringify(configuration)
    </script>

    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>

</body>

</html>
