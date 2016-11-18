tool_enum = {
    SELECTOR : 1,
    DRAWTOOL : 2
}

var currently_selected_tool;

function init(){
    click_selector_tool();
}

function click_selector_tool(){
    document.getElementById("selector_icon_div").style.backgroundColor = "lightblue";
    document.getElementById("selector_text_div").style.backgroundColor = "lightblue";
    if(currently_selected_tool == tool_enum.DRAWTOOL){
        document.getElementById("drawtool_icon_div").style.backgroundColor = "white";
        document.getElementById("drawtool_text_div").style.backgroundColor = "white";
    }
    currently_selected_tool = tool_enum.SELECTOR
}
function click_draw_tool(){
    document.getElementById("drawtool_icon_div").style.backgroundColor = "lightblue";
    document.getElementById("drawtool_text_div").style.backgroundColor = "lightblue";
    if(currently_selected_tool == tool_enum.SELECTOR){
        document.getElementById("selector_icon_div").style.backgroundColor = "white";
        document.getElementById("selector_text_div").style.backgroundColor = "white";
    }
    currently_selected_tool = tool_enum.DRAWTOOL
}