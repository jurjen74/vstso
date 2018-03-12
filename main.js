var featureLinks = [];
var storyLinks = [];
       
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function setValues()
{
    $.each(featureLinks, function(feIdx, feVal){
        var newSPValue = 0;
        $.each(storyLinks, function(stIdx, stVal){
            if(!stVal || !$(stVal.domEle).is(':visible'))
            {
                return;
            }
            var feNext = featureLinks[feIdx+1];
            //console.log("stVal.position.top"+stVal.position.top)
            //console.log("feVal.top"+feVal.position.top)
            if(stVal.position.top > feVal.position.top)
            {
                if(!feNext || stVal.position.top < feNext.position.top && stVal.position.top >= feVal.position.top)
                {
                    //its a match add count and set
                    //console.log('stVal:'+stVal.position.top);
                    //console.log('feNext:'+feNext.position.top);
                    //console.log('feVal:'+feVal.position.top);
                    newSPValue += stVal.spValue;
                }
            }
            console.log("setting avg value" + newSPValue);
            $(feVal.setMe).text(newSPValue);
            $(feVal.setMe).css('color', 'purple');
            $(feVal.setMe).css("font-weight", "bold")
            console.log("")
        });
    });
}

 function getStoriesAndFeatures()
  {
//check we are on visualstudion.com/_projects
if(window.location.href.includes('.visualstudio.com/') && window.location.href.includes('_backlogs'))
{
    featureLinks = [];
    storyLinks = [];
    console.log("we are on visualstudio.com")
   //check we are on the backlog feature/epic/story view
   if(getUrlParameter('level') == 'Features')
   {
       
       console.log("we are on feature view")
       var workItemLinks = $('.work-item-title-link');//.parents('i [aria-label=\'Feature\']').prevObject
       //console.log(workItemLinks);
       console.log('Found: ' + workItemLinks.length + ' work items in view');
       //find the top level features

       $.each(workItemLinks, function(index, value)
       {
           if($(value).siblings('i[aria-label=\'Feature\']').length > 0)
           {
               var featureVal = {
                   'domEle':$(value).parent().parent().parent(),
                   'setMe':$(value).parent().parent().siblings()[4],
                   'position': $(value).parent().parent().parent().position()
               };
               console.log(featureVal)
               featureLinks.push(featureVal);
           }
           if($(value).siblings('i[aria-label=\'User Story\']').length > 0)
           {                       
               var storyPointVal = {
                   'domEle':$(value).parent().parent().parent(),
                   'spValue' : parseInt($(value).parent().parent().siblings()[4].innerText) || 0,
                   'position': $(value).parent().parent().parent().position()
               };
               console.log(storyPointVal)
              
               storyLinks.push(storyPointVal);              
           }
           
       });
       
        setValues();
   }
   



}
}
var prevCanvasStr = "";
(function verifyCanvasContentChanged(){
   var currentHtml = $('.grid-canvas').html();
   if(prevCanvasStr.localeCompare(currentHtml) !== 0 && !recentScroll)
   {
        getStoriesAndFeatures();
   }
   setTimeout(verifyCanvasContentChanged, 5000);
})();

var recentScroll = false;
$( document ).ready(function() {
$( "#mi_105_expand-one-level" ).on( "click", function() {
  getStoriesAndFeatures();
});

$('.grid-canvas').scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        // do something
        getStoriesAndFeatures();
        
    
    }, 500));
    }); 
});


