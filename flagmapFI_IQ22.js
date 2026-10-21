// onionring.js is made up of four files - onionring-widget.js (this one!), onionring-index.js, onionring-variables.js and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-11-24

// === ONIONRING-WIDGET ===
//this file contains the code which builds the widget shown on each page in the ring. ctrl+f 'EDIT THIS' if you're looking to change the actual html of the widget

var tag = document.getElementById(ringID); //find the widget on the page

thisSite = window.location.href; //get the url of the site we're currently on
thisIndex = null;

// go through the site list to see if this site is on it and find its position
for (i = 0; i < sites.length; i++) {
  if (thisSite.startsWith(sites[i])) { //we use startswith so this will match any subdirectory, users can put the widget on multiple pages
    thisIndex = i;
    break; //when we've found the site, we don't need to search any more, so stop the loop
  }
}

function randomSiteEuro() {
  otherSites = sites.slice(); //create a copy of the sites list
  otherSites.splice(thisIndex, 1); //remove the current site so we don't just land on it again
  randomIndex = Math.floor(Math.random() * otherSites.length);
  location.href = otherSites[randomIndex];
}

//if we didn't find the site in the list, the widget displays a warning instead
if (thisIndex == null) {
  tag.insertAdjacentHTML('afterbegin', `
<table>
  <tr>
    <td>This site isn't part of the ${ringName} webring yet.</td>
  </tr>
</table>
  `);
}
else {
  //find the 'next' and 'previous' sites in the ring. this code looks complex
  //because it's using a shorthand version of an if-else statement to make sure
  //the first and last sites in the ring join together correctly
  previousIndex = (thisIndex-1 < 0) ? sites.length-1 : thisIndex-1;
  nextIndex = (thisIndex+1 >= sites.length) ? 0 : thisIndex+1;

  indexText = ""
  //if you've chosen to include an index, this builds the link to that
  if (useIndex) {
    indexText = `<a href='${indexPage}'>index</a> | `;
  }

  randomText = ""
  //if you've chosen to include a random button, this builds the link that does that
  if (useRandom) {
    randomText = `<a style="font-family: none;" href='javascript:void(0)' onclick='randomSiteEuro()'>random</a>`;
  }

  //this is the code that displays the widget - EDIT THIS if you want to change the structure
  tag.insertAdjacentHTML('afterbegin', `
<div class="widgetspacing">
    <style>
        #euroring .widgetspacing
        {
            margin: 8px;
        }
        #euroring .widgetbox
        {
            background-color: #003399;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            border: 4px #FFCC00 double;
            border-radius: 8px;
            box-shadow: 0 0 0 2px #FFCC00;
            width: 250px;
            height: 250px;
            filter: drop-shadow(1px 1px 1px black);
        }
        #euroring .widgetinside
        {
            display: flex;
            flex-flow: column;
            align-items: center;
            gap: 5px;
            width: 250px;
            height:250px;

        }
        #euroring .countryname
        {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 250px;
            height: 34px;
            border-bottom: #FFCC00 1px dashed;
        }
        #euroring p
        {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.4rem;
            font-weight: bold;
            text-align: center;
            color: #FFCC00;
            margin: 2px;
        }
        #euroring a 
        {
            display: inline-block;
            color: #FFCC00;
            text-decoration: none;
            margin-top: 4px;
        }
        #euroring .widgetnavigation
        {
            display: flex;
            flex-flow: row;
            width: 250px;
            height: 170px;
        }
        #euroring .leftbutton
        {
            color: #FFCC00;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
        }
        #euroring .rightbutton
        {
            color: #FFCC00;
            align-items: center;
            justify-content: center;
            display: flex;
            width: 40px;
        }
        #euroring .flagmap
        {
            background-image: url(https://euroring.neocities.org/images/flag-maps/FI.png);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: 170px;
            height: 170px;
            filter: drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px #FFCC00);

        }
        #euroring .widgetinfo
        {
            display: flex;
            flex-flow: row;
            align-items: center;
            height: 34px;
            width: 250px;
            border-top: #FFCC00 1px dashed;
        }
        #euroring .randombutton
        {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
        }
        #euroring .infobutton
        {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
        }
    </style>
    <div class="widgetbox">
        <div class="widgetinside">
            <div class="countryname"><p>FINLAND</p></div>
        <div class="widgetnavigation">
            <div class="leftbutton"><a href='${sites[previousIndex]}' title="Previous Website">⮜</a></div>
            <div class="flagmap"></div>
            <div class="rightbutton"><a href='${sites[nextIndex]}' title="Next Website">⮞</a></div>
        </div>
        <div class="widgetinfo">
            <div class="randombutton"><a style="font-family: none;" href='javascript:void(0)' onclick='randomSiteEuro()'><img src="https://euroring.neocities.org/images/dice-xxl.png" style="width: 15px;" title="Random Website"></a></div>
            <a href="https://euroring.neocities.org"><img src="https://euroring.neocities.org/images/euroringaltnologooutlined.png" style="width: 170px;" title="Euroring, The European Webring!"></a>
            <div class="infobutton"><a href="https://garlic.garden/onionring"><img src="https://euroring.neocities.org/images/info-2-xxl.png" style="width: 15px;" title="What is this?"></a></div>
        </div>
        </div>
    </div>
</div>
  `);

}
