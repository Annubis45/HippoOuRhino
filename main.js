let result=[];
let listToCompare=[];
let curr=null;
let i = 0;
let state = "setup";

function updateState(stateInc)
{
    state = stateInc;
    document.getElementById("setup").hidden = true;
    document.getElementById("battle").hidden = true;
    document.getElementById("end").hidden = true;

    if(state == "battle")
        document.getElementById("battle").hidden = false;
    
    if(state == "setup")
        document.getElementById("setup").hidden = false;
    
    if(state == "end")
        document.getElementById("end").hidden = false;
    
}
setTimeout(() => {
    initFromUrl();
    updateState("setup");
}, (500));

function add()
{
    document.getElementById("entry").value.split('\n').forEach(element => {
        if(element && element.trim())
            listToCompare.push(element);
    });
	
	document.getElementById("entry").value="";
    setParticipant();
}

function setParticipant()
{
    const elt = document.getElementById("all");
    if(listToCompare.length>0)
        elt.innerHTML = "<li>"+listToCompare.reduce((x,y) => x + "</li><li>"+y) + "</li>";
    else 
        elt.innerHTML = "";
    
}

function sort(){
    updateState("battle");
	result.push(listToCompare.pop());
	popAndSort();
};

function popAndSort()
{
	if(listToCompare.length==0)
    {
        curr=null;
        console.log(result);
        document.getElementById("result").innerHTML = "<li>"+result.reduce((x,y) => x + "</li><li>"+y) + "</li>";
        updateState("end");
    }else
    {
      curr = listToCompare.pop();
      i=0;
      compare();
    }
}

function reset()
{
    result=[];
    listToCompare=[];
    curr=null;
    i = 0;
    setParticipant();
    updateState("setup");
}


function answer(bool)
{

	if(bool)
    {
		result.insert(i,curr);
		popAndSort();
    }
	else if(i==result.length-1)
    {
		result.push(curr);
		popAndSort();
    }else
    {
    	compareNext();
    }
}

function compare()
{
	document.getElementById("rep1").innerText = curr;
    document.getElementById("rep2").innerText = result[i];
}

function compareNext()
{
	i++;
    compare();
}


Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};


function initFromUrl()
{
    reset();
    const httpVars= getUrlVars();
    if(httpVars["participants"])
        listToCompare = httpVars["participants"].split('$');
    setParticipant();
}

function getUrl()
{
    let url ;
    if(window.location.href.indexOf('?')<=-1)
        url=window.location.href + '?';
    else
        url = window.location.href.slice(0,window.location.href.indexOf('?')+1);
    
    const addinUrl= [...listToCompare,...result];
    if(curr)
        addinUrl.push(curr);
    if(addinUrl.length>0)
        url += 'participants='+ addinUrl.reduce((x,y) => (x + '$' + y));
    
    document.getElementById("url").value = url;
}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}