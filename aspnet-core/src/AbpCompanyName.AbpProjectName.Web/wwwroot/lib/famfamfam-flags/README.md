
# famfamfam-flags

[![NPM version](https://img.shields.io/npm/v/famfamfam-flags.svg)](https://www.npmjs.org/package/famfamfam-flags)
[![Bower version](https://img.shields.io/bower/v/famfamfam-flags.svg)](http://bower.io/search/?q=famfamfam-flags)
[![Packagist version](https://img.shields.io/packagist/v/legacy-icons/famfamfam-flags.svg)](https://packagist.org/packages/legacy-icons/famfamfam-flags)
[![Nuget version](https://img.shields.io/nuget/v/famfamfam-flags.svg)](https://www.nuget.org/packages/famfamfam-flags/)

[![Dependency Status](https://img.shields.io/david/dev/legacy-icons/famfamfam-flags.svg)](https://david-dm.org/legacy-icons/famfamfam-flags)
[![Build Status](https://img.shields.io/travis/legacy-icons/famfamfam-flags.svg)](https://travis-ci.org/legacy-icons/famfamfam-flags)



## About

The `Flags` icon pack, as available on [famfamfam website](http://www.famfamfam.com/lab/icons/flags/).

All credits for these icons go to their original author: Mark James (mjames@gmail.com)

The aim of this project is to make this icon pack available through various package managers, such as:

- [NPM](https://npmjs.org)
- [Bower](http://bower.io)
- [Packagist](https://packagist.org)
- [NuGet](https://www.nuget.org)


All icons are supplied in both PNG and GIF formats.


## Extensions and updates

A flag has been added to the original package: `gg.png` (or `gg.gif`).
This flag was created by [Damien Guard (@damieng)](https://github.com/damieng) (damieng@gmail.com), in the "add-on" package for FamFamFam icons named [Silk Companion](http://damieng.com/creative/icons/silk-companion-1-icons).


The flag for Myanmar has been updated: `mm.png` (or `mm.gif`).
This flag was updated by [@Lucas](https://github.com/lucas34), and was created from [Wikipedia](https://commons.wikimedia.org/wiki/File:Flag_of_Myanmar-new.jpg).


The project now supports aliases in CSS spritesheets (see below). The feature was brought by [@Rangoo94](https://github.com/Rangoo94). For example, `RE` ([Reunion](https://en.wikipedia.org/wiki/.re)) is an alias for `FR` ([France](https://en.wikipedia.org/wiki/.fr)), since Reunion shares the same flag as France. To see the aliases, please check the [aliases.json file](https://github.com/legacy-icons/famfamfam-flags/blob/master/aliases.json).


## CSS spritesheets

You can insert the icons directly into your HTML with a common IMG tag:

```html
<img alt="French Flag" src="dist/png/fr.png" width="16" height="11">
```


In addition to the icons by themselves, this project also ships a CSS spritesheet for the icon-pack. This spritesheet allows to load the entire icon-pack in just 1 image, and thus reduce HTTP calls.

This is what it actually looks:

![Spritesheet](https://raw.githubusercontent.com/legacy-icons/famfamfam-flags/master/dist/sprite/famfamfam-flags.png)


All the positioning of the icons inside this alone image is made through CSS, which allows you to just add block-type tags with the proper class and get the same result:

```html
<div class="famfamfam-flags fr"></div>
```

Just remember to add the CSS stylesheet to the HEAD of your HTML page!

## Install

### NPM

> npm install famfamfam-flags


### Bower

> bower install famfamfam-flags


### Composer / Packagist

> composer require legacy-icons/famfamfam-flags


### NuGet

> Install-Package famfamfam-flags



## Build the whole project or your custom project

We use [Gulp](http://gulpjs.com/) to build the project, so if you want to re-build or customize this project, you'll need Gulp.

After gulp is installed, and your CLI is pointed to your work directory, first install the dependencies:

**with NPM 2.x.x**

> npm install

**with NPM 3.x.x** (resolve dependencies for `node-spritesheet` before this module's ones)

> npm install grunt grunt-contrib-coffee grunt-contrib-clean

> npm install

then be sure that you have *[ImageMagick](http://www.imagemagick.org/script/binary-releases.php)* installed for building spritesheet.

then, you can run the `gulp build` task to build the project:

> gulp build


### What the build task does?

First, it takes PNG and GIF files from the `src` folder, and tidies them to the `dist` folder.

Then it creates a spritesheet from the PNG images located in the `src` folder, and thus creates the `sprite` folder in `dist`.

If, for example you just want `fr` and `gg` icons in a spritesheet, you just have to fork this project, point your CLI to the working directory, 
empty the `src` directory, except `fr` and `gg` icons in PNG format, and then run the `gulp build` task.

You'll get the proper spritesheet and copies of the icons directly in the `dist` folder.


## License

See [License](https://github.com/legacy-icons/famfamfam-flags/blob/master/LICENSE.md)
