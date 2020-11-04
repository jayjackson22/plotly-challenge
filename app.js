d3.json("samples.json").then((incomingData) => {
    console.log(incomingData)
    var data = incomingData.metadata
    console.log(data)

    //Populate dropdown with names
    var dropDown = d3.selectAll("#selDataset")
        data.forEach(d => {
        var item = dropDown.append("option")
        item.text(d.id)
    });

    var idSelect = d3.select("#selDataset")

    idSelect.on("change", runFilter);

    function runFilter() {
        d3.event.preventDefault();
        
        var selectedId = idSelect.property("value")
        // console.log(selectedId);

        var demoData = []
        var demoData = data.filter(d => d.id == selectedId)

        var demoList = d3.select("#sample-metadata")

        var demoEntries = demoData[0]
        console.log(demoEntries)
        
        d3.select("table").remove();
        demoList.append("table").append("tbody")

        Object.entries(demoEntries).forEach(function([key,value]) {
            var tableData = d3.select("tbody").append('tr').append('td')
            tableData.text(`${key}: ${value}`)
            
            console.log(key);
            console.log(value);
        })
        

    }

    

})