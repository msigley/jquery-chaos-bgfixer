jquery-chaos-bgfixer
====================

A jQuery plugin that forces the size of HTML elements to be set so that CSS backgrounds are never incompletely rendered (cut off).

Example Usage
-------------

```
<html>
	<head>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script type="text/javascript">
			jQuery(document).ready(function($) {
				$('#elementWithCSSBackground').fixCssBg();
			});
		</script>
		<style type="text/css">
			#elementWithCSSBackground {
				background: url('your image url') top left repeat-x transparent;
			}
		</style>
	</head>
	<body>
		<div id="elementWithCSSBackground">Some content in here.</div>
	</body>
</html>
```

Currently the plugin only supports fixing the following values for background-repeat:
*	repeat-x
*	repeat-y
*	repeat
Any other value for background-repeat will be silently ignored so the plugin does not mess up HTML content.

Wishlist
--------

* Support for double word values of background-repeat.
* Add an option for setting the background-color element to the average sampled color in the background-image.