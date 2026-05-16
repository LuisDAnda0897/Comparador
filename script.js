const agentes = {
    "miguel.ayala@swartz.mx": {
        correo: "miguel.ayala@swartz.mx",
        extension: "125"
    },
    "aylin.bocanegra@swartz.mx": {
        correo: "aylin.bocanegra@swartz.mx",
        extension: "118"
    },
    "francisco.mendoza@swrtz.mx": {
        correo: "francisco.mendoza@swrtz.mx",
        extension: "100"
    },
    "luis.deanda@swartz.mx": {
        correo: "luis.deanda@swartz.mx",
        extension: "104"
    }
};

const agenteSelect = document.getElementById("agenteSelect");
const correoAgente = document.getElementById("correoAgente");
const extensionAgente = document.getElementById("extensionAgente");
const fechaCoti = document.getElementById("fechaCoti");

agenteSelect.addEventListener("change", () => {
    const agente = agentes[agenteSelect.value];

    if (!agente) {
        correoAgente.textContent = "Correo:";
        extensionAgente.textContent = "Tel: 33 2878 5446 Ext:";
        return;
    }

    correoAgente.textContent = `Correo: ${agente.correo}`;
    extensionAgente.textContent = `Tel: 33 2878 5446 Ext: ${agente.extension}`;
});

function actualizarFecha() {
    const hoy = new Date();

    fechaCoti.textContent = hoy.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

actualizarFecha();

document.querySelectorAll(".coverage__Cell").forEach((cell) => {
    const select = cell.querySelector("select");
    const valorInput = cell.querySelector("input");

    if (!select || !valorInput) return;

    valorInput.classList.add("valorOculto");

    select.addEventListener("change", () => {
        const texto = select.value.toLowerCase();

        const mostrarValor =
            texto.includes("valor convenido") ||
            texto.includes("convenido +10") ||
            texto.includes("convenido+10");

        if (mostrarValor) {
            valorInput.classList.remove("valorOculto");
        } else {
            valorInput.classList.add("valorOculto");
            valorInput.value = "";
        }
    });
});

const planes = [
    document.getElementById("unitModeUber"),
    document.getElementById("unitModeMulti"),
    document.getElementById("unitModeNormal")
];

planes.forEach((plan) => {
    plan.addEventListener("change", () => {
        if (plan.checked) {
            planes.forEach((otroPlan) => {
                if (otroPlan !== plan) otroPlan.checked = false;
            });
        }

        llenarCoberturasAutomaticas();
    });
});

function obtenerPlanSeleccionado() {
    if (document.getElementById("unitModeUber").checked) return "uber";
    if (document.getElementById("unitModeMulti").checked) return "multiplataforma";
    if (document.getElementById("unitModeNormal").checked) return "particular";
    return "";
}

const aseguradoras = [
    { nombre: "AXA", checkId: "AXAlogo" },
    { nombre: "GNP", checkId: "GNPlogo" },
    { nombre: "Qualitas", checkId: "QualitasLogo" },
    { nombre: "Banorte", checkId: "BanorteLogo" },
    { nombre: "SPT", checkId: "SPTlogo" },
    { nombre: "Latino", checkId: "LatinoLogo" }
];

function obtenerAseguradorasSeleccionadas() {
    return aseguradoras
        .map((aseguradora, index) => ({
            ...aseguradora,
            index,
            checked: document.getElementById(aseguradora.checkId).checked
        }))
        .filter(aseguradora => aseguradora.checked);
}

function llenarCoberturasAutomaticas() {
    const plan = obtenerPlanSeleccionado();

    if (!plan) return;

    const datos = {
        particular: {
            dm: ["5%", "5%", "5%", "5%", "5%"],
            rb: ["10%", "10%", "10%", "10%", "10%"],
            rc: ["$4,000,000", "$3,000,000", "$3,000,000", "$4,000,000", "$3,000,000", "$3,000,000"],
            rcd: ["0%", "0%", "0%", "0%", "0%", "0%"],
            rco: ["Incluido", "Incluido", "Incluido", "Incluido", "Incluido", "Incluido"],
            gm: ["$200,000", "$200,000", "$200,000", "$200,000", "$200,000", "$200,000"],
            av: ["5 Eventos", "5 Eventos", "5 Eventos", "5 Eventos", "1 Evento", "5 Eventos"],
            al: ["Incluida", "Incluida", "Incluida", "Incluida", "Incluida", "Incluida"],
        },
        uber: {
            dm: ["10%", "10%", "10%", "10%", "10%"],
            rb: ["20%", "20%", "20%", "20%", "20%"],
            rc: ["$4,000,000  N/A", "$3,000,000  50UMAs", "$3,000,000  50UMAs", "$4,000,000  50UMAs", "$3,000,000  N/A", "$3,000,000  20UMAs"],
            rcd: ["0%", "0%", "0%", "0%", "0%", "0%"],
            rco: ["$1,5000,000", "$3,000,000", "5,000 UMAs", "5,000 UMAs", "5,000 UMAs", "5,000 UMAs"],
            gm: ["$200,000", "$200,000", "$200,000", "$200,000", "$200,000", "$200,000"],
            av: ["5 Eventos", "5 Eventos", "2 Eventos", "2 Eventos", "1 Eventos", "2 Eventos"],
            al: ["Incluida", "Incluida", "Incluida", "Incluida", "Incluida", "Incluida"],
        },
        multiplataforma: {
            dm: ["10%", "10%", "10%", "10%", "10%"],
            rb: ["20%", "20%", "20%", "20%", "20%"],
            rc: ["$4,000,000  50UMAs", "$3,000,000  50UMAs", "$3,000,000  50UMAs", "$4,000,000  50UMAs", "$3,000,000  N/A", "$3,000,000  20UMAs"],
            rcd: ["0%", "0%", "0%", "0%", "0%", "0%"],
            rco: ["5,000 UMAs", "$3,000,000", "5,000 UMAs", "5,000 UMAs", "5,000 UMAs", "5,000 UMAs"],
            gm: ["$200,000", "$200,000", "$200,000", "$200,000", "$200,000", "$200,000"],
            av: ["2 Eventos", "5 Eventos", "2 Eventos", "2 Eventos", "1 Evento", "2 Eventos"],
            al: ["Incluida", "Incluida", "Incluida", "Incluida", "Incluida", "Incluida"],
        }
    };

    llenarInputs(".dm__Input", datos[plan].dm, false);
    llenarInputs(".rb__Input", datos[plan].rb, false);
    llenarInputs(".rc__Input", datos[plan].rc);
    llenarInputs(".rcd__Input", datos[plan].rcd);
    llenarInputs(".rco__Input", datos[plan].rco);
    llenarInputs(".gm__Input", datos[plan].gm);
    llenarInputs(".av__Input", datos[plan].av);
    llenarInputs(".al__Input", datos[plan].al);
}

function llenarInputs(selector, valores, incluyeAXA = true) {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach((input, index) => {
        const aseguradoraIndex = incluyeAXA ? index : index + 1;
        const estaSeleccionada = document.getElementById(aseguradoras[aseguradoraIndex].checkId).checked;

        if (estaSeleccionada) {
            input.value = valores[index] || "";
        } else {
            input.value = "";
        }
    });
}

document.getElementById("generarPDF").addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("landscape", "mm", "letter");

    const aseguradorasPDF = [
        { nombre: "AXA", checkId: "AXAlogo", index: 0, logo: "LOGO/AXA_Logo.svg.png" },
        { nombre: "GNP", checkId: "GNPlogo", index: 1, logo: "LOGO/gnp-seguros.png" },
        { nombre: "Qualitas", checkId: "QualitasLogo", index: 2, logo: "LOGO/qualitas_logo.png" },
        { nombre: "Banorte", checkId: "BanorteLogo", index: 3, logo: "LOGO/banorte.png" },
        { nombre: "SPT", checkId: "SPTlogo", index: 4, logo: "LOGO/images.png" },
        { nombre: "Latino", checkId: "LatinoLogo", index: 5, logo: "LOGO/latino seguros.png" }
    ];

    const seleccionadas = aseguradorasPDF.filter((aseguradora) => {
        return document.getElementById(aseguradora.checkId).checked;
    });

    if (seleccionadas.length === 0) {
        alert("Selecciona al menos una aseguradora para generar el PDF.");
        return;
    }

    async function cargarImagen(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                canvas.getContext("2d").drawImage(img, 0, 0);
                resolve({
                    data: canvas.toDataURL("image/png"),
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            };
            img.onerror = () => resolve(null);
            img.src = src;
        });
    }

    function dibujarImagenAjustada(doc, imagen, x, y, maxW, maxH) {
        if (!imagen) return;

        const ratio = imagen.width / imagen.height;
        let w = maxW;
        let h = w / ratio;

        if (h > maxH) {
            h = maxH;
            w = h * ratio;
        }

        doc.addImage(
            imagen.data,
            "PNG",
            x + (maxW - w) / 2,
            y + (maxH - h) / 2,
            w,
            h
        );
    }

    const logoSwartz = await cargarImagen("logo-Photoroom.png");

    const logosAseguradoras = {};
    for (const aseguradora of seleccionadas) {
        logosAseguradoras[aseguradora.nombre] = await cargarImagen(aseguradora.logo);
    }

    function valorDeLista(selector, index) {
        const elementos = Array.from(document.querySelectorAll(selector));
        const elemento = elementos[index];
        return elemento ? elemento.value || "-" : "-";
    }

    function obtenerValores(selector) {
        return seleccionadas.map(aseguradora => valorDeLista(selector, aseguradora.index));
    }

    function obtenerRT() {
        const rbInputs = Array.from(document.querySelectorAll(".rb__Input"));

        return seleccionadas.map((aseguradora) => {
            if (aseguradora.index === 0) return document.getElementById("rbAXA").value || "-";
            return rbInputs[aseguradora.index - 1]?.value || "-";
        });
    }

    function obtenerDañosMateriales() {
        const sumaIds = ["smaAXA", "smaGNP", "smaQual", "smaBanorte", "smaSPT", "smaLatino"];
        const valorIds = ["valorAXA", "valorGNP", "valorQua", "valorBanorte", "valorSPT", "valorLatino"];
        const dmInputs = Array.from(document.querySelectorAll(".dm__Input"));

        return seleccionadas.map((aseguradora) => {
            const suma = document.getElementById(sumaIds[aseguradora.index])?.value || "-";
            const valor = document.getElementById(valorIds[aseguradora.index])?.value || "";
            const deducible = aseguradora.index === 0
                ? document.getElementById("dmAXA").value || "-"
                : dmInputs[aseguradora.index - 1]?.value || "-";

            const partes = [suma];
            if (valor) partes.push(valor);
            partes.push(deducible);

            return partes.join(" / ");
        });
    }

    function convertirPrecio(numeroTexto) {
        return Number(String(numeroTexto).replace(/[^0-9.]/g, "")) || Infinity;
    }

    const costosTodos = Array.from(document.querySelectorAll(".price__Input"));
    const costos = seleccionadas.map(aseguradora => {
        const input = costosTodos[aseguradora.index];
        return input ? input.value || "-" : "-";
    });

    const preciosNumericos = costos.map(convertirPrecio);
    const precioMinimo = Math.min(...preciosNumericos);

    const formasPagoTodas = Array.from(document.querySelectorAll(".payment__Options"));
    const formasPago = seleccionadas.map(aseguradora => {
        const contenedor = formasPagoTodas[aseguradora.index];
        return contenedor ? contenedor.innerText.replace(/\n/g, " / ") : "-";
    });

    const azul = [49, 134, 245];
    const azulClaro = [226, 239, 255];
    const dorado = [193, 148, 93];
    const grisTexto = [31, 41, 51];
    const verdeSuave = [218, 247, 224];

    if (logoSwartz) {
        dibujarImagenAjustada(doc, logoSwartz, 14, 8, 45, 20);
    }

    doc.setDrawColor(...dorado);
    doc.setLineWidth(1.2);
    doc.line(14, 31, 265, 31);

    doc.setFont(undefined, "bold");
    doc.setTextColor(...grisTexto);
    doc.setFontSize(16);
    doc.text("Comparativa de Seguro de Auto", 70, 14);

    doc.setFont(undefined, "normal");
    doc.setFontSize(8);

    const agenteNombre = document.getElementById("agenteSelect").selectedOptions[0]?.textContent || "";
    const correo = document.getElementById("correoAgente").textContent || "";
    const extension = document.getElementById("extensionAgente").textContent || "";

    doc.text(`Cliente: ${document.getElementById("clientName").value || ""}`, 70, 22);
    doc.text(`F. Nacimiento: ${document.getElementById("clientBdy").value || ""}`, 70, 27);
    doc.text(`C.P: ${document.getElementById("clientCP").value || ""}`, 70, 32);

    doc.text(`Vehículo: ${document.getElementById("unitYear").value || ""} ${document.getElementById("unitName").value || ""}`, 145, 22);
    doc.text(`Agente: ${agenteNombre}`, 145, 27);
    doc.text(correo, 145, 32);

    doc.text(extension, 220, 27);
    doc.text(`Fecha: ${fechaCoti.textContent}`, 220, 32);

    const head = [["Rubro", ...seleccionadas.map(() => "")]];

    const body = [
        ["Costo Anual", ...costos],
        ["Otras formas de pago", ...formasPago],
        ["Daños Materiales", ...obtenerDañosMateriales()],
        ["Robo Total", ...obtenerRT()],
        ["Responsabilidad Civil Daños a Terceros", ...obtenerValores(".rc__Input")],
        ["Responsabilidad Civil Ocupantes", ...obtenerValores(".rco__Input")],
        ["Gastos Médicos Ocupantes", ...obtenerValores(".gm__Input")],
        ["Asistencia Vial", ...obtenerValores(".av__Input")],
        ["Asistencia Legal", ...obtenerValores(".al__Input")],
        ["Accidentes al Conductor", ...obtenerValores(".ac__Input")]
    ];

    doc.autoTable({
        startY: 39,
        head,
        body,
        theme: "grid",
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: grisTexto,
            lineColor: dorado,
            lineWidth: 0.45,
            minCellHeight: 18
        },
        styles: {
            fontSize: 8,
            halign: "center",
            valign: "middle",
            cellPadding: 2,
            lineColor: dorado,
            lineWidth: 0.25
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252]
        },
        columnStyles: {
            0: {
                halign: "left",
                fontStyle: "bold",
                cellWidth: 45,
                fillColor: azulClaro
            }
        },
        didParseCell: function (data) {
            if (data.section === "body" && data.row.index === 0) {
                data.cell.styles.fontSize = data.column.index === 0 ? 10 : 13;
                data.cell.styles.fontStyle = "bold";
                data.cell.styles.minCellHeight = 12;

                if (data.column.index > 0) {
                    const costoIndex = data.column.index - 1;
                    const esMasBarato = preciosNumericos[costoIndex] === precioMinimo;

                    data.cell.styles.textColor = esMasBarato ? [20, 120, 55] : [20, 80, 150];
                    data.cell.styles.fillColor = esMasBarato ? verdeSuave : [239, 246, 255];
                }
            }

            if (data.section === "body" && data.row.index === 1) {
                data.cell.styles.fontSize = 8;
                data.cell.styles.fillColor = [255, 252, 245];
            }
        },
        didDrawCell: function (data) {
            if (data.section === "head" && data.column.index > 0) {
                const aseguradora = seleccionadas[data.column.index - 1];
                const logo = logosAseguradoras[aseguradora.nombre];

                dibujarImagenAjustada(
                    doc,
                    logo,
                    data.cell.x + 2,
                    data.cell.y + 2,
                    data.cell.width - 4,
                    data.cell.height - 4
                );
            }
        }
    });

    doc.setFontSize(7);
    doc.setTextColor(90, 90, 90);
    doc.text("Documento generado por Swartz Seguros y Contabilidad", 14, 205);

    doc.save("comparativa-seguros.pdf");
});

permitirSoloUno(["Femenino", "Masculino"]);
permitirSoloUno(["unitModeUber", "unitModeMulti", "unitModeNormal"]);

aseguradoras.forEach((aseguradora) => {
    document.getElementById(aseguradora.checkId).addEventListener("change", () => {
        llenarCoberturasAutomaticas();
    });
});
