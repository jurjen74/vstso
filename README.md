VSTO

Adds the functionality to view feature backlog item totals into visual studio team services, via javascript override

The tool relies upon a browser add on to run additional javascript in your browser, when you are browsing VSTS

I have tested with the following for chrome:

https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija?hl=en

The configuration is as follows:
![Plugin Configuration](https://raw.githubusercontent.com/OliverDolan/vstso/master/plugin%20config.png)

You take the script from here and paste it into the box and configure it to run for your visual studio url like I have done for WorldFavor.visualstudio.com

It will give the following output

![New Backlog View](https://raw.githubusercontent.com/OliverDolan/vstso/master/backlog.png)
