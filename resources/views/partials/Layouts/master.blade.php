<!DOCTYPE html>
<html lang="en">

<meta charset="utf-8" />
<title>@yield('title', ' | FabKin Admin & Dashboards Template')</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta content="Admin & Dashboards Template" name="description" />
<meta content="Pixeleyez" name="author" />

<!-- Ultra Performance Optimization -->
<link rel="stylesheet" href="assets/css/ultra-light.css">
<script src="assets/js/asset-optimizer.js"></script>
<script src="assets/js/ultra-performance.js"></script>
<script src="assets/js/cleanup-scripts.js"></script>

<!-- App favicon -->
<link rel="shortcut icon" href="assets/images/k_favicon_32x.png">

@yield('css')
@include('partials.head-css')

<body>

    @include('partials.header')
    @include('partials.sidebar')
    @include('partials.horizontal')

    <main class="app-wrapper">
        <div class="container-fluid">

            @include('partials.page-title')

            @yield('content')
            @include('partials.switcher')
            @include('partials.scroll-to-top')
            @include('partials.footer')

            @include('partials.vendor-scripts')

            @yield('js')

</body>

</html>
