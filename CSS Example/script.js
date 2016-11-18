tool_enum = {
    SELECTOR : 1,
    DRAWTOOL : 2
}

var currently_selected_tool;

function init(){
    click_selector_tool();
}


function click_new(){
    alert("You clicked new");
}
function click_download(){
    alert("You clicked download");
}
function click_share(){
    alert("Share this link with others:\nhttp://seifubhwel.com/?id=sguihg");
}
function click_selector_tool(){
    document.getElementById("selector_icon_div").style.backgroundColor = "lightblue";
    if(currently_selected_tool == tool_enum.DRAWTOOL){
        document.getElementById("drawtool_icon_div").style.backgroundColor = "white";
    }
    currently_selected_tool = tool_enum.SELECTOR
}
function click_draw_tool(){
    document.getElementById("drawtool_icon_div").style.backgroundColor = "lightblue";
    if(currently_selected_tool == tool_enum.SELECTOR){
        document.getElementById("selector_icon_div").style.backgroundColor = "white";
    }
    currently_selected_tool = tool_enum.DRAWTOOL
}
