# EaselJS Display List Inspector
> Last Updated Jan 8, 2016

## Usage

* copy DisplayListInspector.js into your project where you like
* use `import {DisplayListInspector} from 'path/to/DisplayListInspector';` to import the inspector class
* create an instance of the inspector class: `let inspector = new DisplayListInspector();`
* inspect a DisplayObject: `inspector.inspect(myDisplayObject)`;
* inspect part of a DisplayObject: `inspector.inspect(myDisplayObject, maxDepth);` where `maxDepth > 0`
