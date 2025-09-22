<!DOCTYPE html>
<html lang="en">

<meta charset="utf-8" />
<title>@yield('title', ' | FabKin Admin & Dashboards Template')</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta content="Admin & Dashboards Template" name="description" />
<meta content="Pixeleyez" name="author" />

<!-- App CSS -->
<link rel="stylesheet" href="assets/css/app.min.css">
<link rel="stylesheet" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/css/icons.min.css">

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

            <!-- App JavaScript -->
            <script src="assets/js/app.js"></script>
            <script src="assets/js/layout-setup.js"></script>
            <script src="assets/js/plugins.js"></script>

            @yield('js')

</body>

</html>
