d3.json("samples.json").then((incomingData) => {
    var data = incomingData.metadata
    var samples = incomingData.samples
    
    //Populate dropdown with names
    var dropDown = d3.selectAll("#selDataset")
        data.forEach(d => {
        var item = dropDown.append("option")
        item.text(d.id)
    });

    //Select Dropdown Control
    var idSelect = d3.select("#selDataset")
    idSelect.on("change", runFilter);

    //function to run once dropdown selected value changes
    function runFilter() {
        //prevent default
        d3.event.preventDefault();
        
        //Value of dropdown
        var selectedId = idSelect.property("value")

        //Demographic data 
        var demoData = []
        var demoData = data.filter(d => d.id == selectedId)
        var demoList = d3.select("#sample-metadata")
        var demoEntries = demoData[0]
        
        //remove existing table
        d3.select("table").remove();
        //append new table
        demoList.append("table").append("tbody")

        //Populate Demographic Info
        Object.entries(demoEntries).forEach(function([key,value]) {
            var tableData = d3.select("tbody").append('tr').append('td')
            tableData.text(`${key}: ${value}`)
        })

        
    }
})