function cargarGrafico(datos = [], name) {
    const chart = new CanvasJS.Chart("chartContainer", {
        backgroundColor: "rgba(0, 191, 255, 0.6)",
        animationEnabled: true,
        title: {
            text: `Estadísticas de poder para ${name}`,
            fontFamily: "Bangers",
            fontColor:"#2E4053",
           

        },
        
        data: [{
            indexLabelFontColor: "#e30045",
            indexLabelFontWeight: "bold",
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",

            dataPoints: 
            datos,



        }]
    });
    chart.render();
};

function obtenerData(id) {
    let url = "https://www.superheroapi.com/api.php/4905856019427443/" + id;

    $.ajax(url)
        .done(function (datos) {
            let { powerstats } = datos;
            let dataPoints = [];
            for (const [key, value] of Object.entries(powerstats)) {
                //{label: "texto", y: 50}
                let dato = {

                    label: key,
                    y: value
                }

                dataPoints.push(dato);
            }
            cargarGrafico(dataPoints, datos.name);
            cargarCard(datos);
        })
        .fail(function () {
            alert("error");
        })

}
$("form").on("submit", function (event) {
  
    event.preventDefault();
    const id = $("#formSuperhero").val()
    if(isNaN(id) || id<1 || id>732) {
        alert(" ingresa un mumero numero entre 1 y 732")
    }
    else{
            obtenerData(id);
    }


});




function cargarCard(superhero) {
    $("#cardContainer").html(
        `<div class="card mb-3 bg-transparent overflow-scroll border-0" style="height: 370px; width: 100%; "> 
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${superhero.image.url}" class="img-fluid rounded-start h-100 object-fit-cover" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${superhero.name}</h5>
              <h6 class="card-subtitle">"Nombre Real: ${superhero.biography["full-name"]}"</h6>
              <p class="alter-egos">"aAlter egos: ${superhero.biography["alter-egos"]}"</p>
                <p class="alias">"Alias: ${superhero.biography["aliases"]}"</p> 
                <p class="primera aparicion">"Primera aparición: ${superhero.biography["first-appeareance"]}"</p> 
                <p class="ocupacion">"ocupacion: ${superhero.work["ocupation"]}"</p> 
                <p class="conexiones">"conexiones: ${superhero.connections["group-affiliation"]}"</p> 
                <p class="publicado por">"publicado por: ${superhero.biography["publisher"]}</p> 
              <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>`
    )
}



