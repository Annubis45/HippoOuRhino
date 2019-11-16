let result=[];
let listToCompare=[];
let curr=null;
let i = 0;

function add()
{
	listToCompare.push(document.getElementById("entry").value);
	document.getElementById("entry").value="";
    document.getElementById("all").value=listToCompare.toString();
}

function sort(){
	result.push(listToCompare.pop());
	popAndSort();
};
function popAndSort()
{
	if(listToCompare.length==0)
    {
        console.log(result);
        document.getElementById("result").innerHTML = result.toString();
        document.getElementById("rep1").disabled=true;
    	document.getElementById("rep2").disabled=true;
    }else
    {
      curr = listToCompare.pop();
      i=0;
      compare();
    }
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
	document.getElementById("rep1").value = curr;
    document.getElementById("rep2").value = result[i];
}

function compareNext()
{
	i++;
    compare();
}


Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
