const agentes = {
    "miguel.ayala@swartz.mx": { correo: "miguel.ayala@swartz.mx", extension: "125" },
    "aylin.bocanegra@swartz.mx": { correo: "aylin.bocanegra@swartz.mx", extension: "118" },
    "luis.deanda@swartz.mx": { correo: "luis.deanda@swartz.mx", extension: "104" },
    "francisco.mendoza@swartz.mx": { correo: "francisco.mendoza@swartz.mx", extension: "100" },
    "karen.miranda@swartz.mx": { correo: "karen.miranda@swartz.mx", extension: "101" },
    "lupita.ortega@swartz.mx": { correo: "lupita.ortega@swartz.mx", extension: "107" },
    "mexicali@swartz.mx": { correo: "mexicali@swartz.mx", extension: "112" }
};

const agenteSelect = document.getElementById("agenteSelect");
const correoAgente = document.getElementById("correoAgente");
const extensionAgente = document.getElementById("extensionAgente");
const fechaCoti = document.getElementById("fechaCoti");

const aseguradoras = [
    { nombre: "AXA", checkId: "AXAlogo", logo: "LOGO/AXA_Logo.svg.png" },
    { nombre: "GNP", checkId: "GNPlogo", logo: "LOGO/gnp-seguros.png" },
    { nombre: "Qualitas", checkId: "QualitasLogo", logo: "LOGO/qualitas_logo.png" },
    { nombre: "Banorte", checkId: "BanorteLogo", logo: "LOGO/banorte.png" },
    { nombre: "SPT", checkId: "SPTlogo", logo: "LOGO/images.png" },
    { nombre: "Latino", checkId: "LatinoLogo", logo: "LOGO/latino seguros.png" }
];

const sumaIds = ["smaAXA", "smaGNP", "smaQual", "smaBanorte", "smaSPT", "smaLatino"];
const valorIds = ["valorAXA", "valorGNP", "valorQua", "valorBanorte", "valorSPT", "valorLatino"];

const datosPorPlan = {
    particular: {
        dm: ["5%", "5%", "5%", "5%", "5%"],
        rb: ["10%", "10%", "10%", "10%", "10%"],
        rc: ["$4,000,000", "$3,000,000", "$3,000,000", "$4,000,000", "$3,000,000", "$3,000,000"],
        rcd: ["Sin deducible", "Sin deducible", "Sin deducible", "Sin deducible", "Sin deducible", "Sin deducible"],
        rco: ["Incluido", "Incluido", "Incluido", "Incluido", "Incluido", "Incluido"],
        gm: ["$200,000", "$200,000", "$200,000", "$200,000", "$200,000", "$200,000"],
        av: ["5 Eventos", "5 Eventos", "5 Eventos", "5 Eventos", "1 Evento", "5 Eventos"],
        al: ["Incluida", "Incluida", "Incluida", "Incluida", "Incluida", "Incluida"],
        ac: ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A"]
    },
    uber: {
        dm: ["10%", "10%", "10%", "10%", "10%"],
        rb: ["20%", "20%", "20%", "20%", "20%"],
        rc: ["$4,000,000", "$3,000,000", "$3,000,000", "$4,000,000", "$3,000,000", "$3,000,000"],
        rcd: ["N/A", "50 UMAs", "50 UMAs", "50 UMAs", "N/A", "20 UMAs"],
        rco: ["$1,500,000", "$3,000,000", "5,000 UMAs", "5,000 UMAs", "5,000 UMAs", "5,000 UMAs"],
        gm: ["$200,000", "$200,000", "$200,000", "$200,000", "$200,000", "$200,000"],
        av: ["5 Eventos", "5 Eventos", "2 Eventos", "2 Eventos", "1 Evento", "2 Eventos"],
        al: ["Incluida", "Incluida", "Incluida", "Incluida", "Incluida", "Incluida"],
        ac: ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A"]
    },
    multiplataforma: {
        dm: ["10%", "10%", "10%", "10%", "10%"],
        rb: ["20%", "20%", "20%", "20%", "20%"],
        rc: ["$4,000,000", "$3,000,000", "$3,000,000", "$4,000,000", "$3,000,000", "$3,000,000"],
        rcd: ["50 UMAs", "50 UMAs", "50 UMAs", "50 UMAs", "N/A", "20 UMAs"],
        rco: ["5,000 UMAs", "$3,000,000", "5,000 UMAs", "5,000 UMAs", "5,000 UMAs", "5,000 UMAs"],
        gm: ["$200,000", "$200,000", "$200,000", "$200,000", "$200,000", "$200,000"],
        av: ["2 Eventos", "5 Eventos", "2 Eventos", "2 Eventos", "1 Evento", "2 Eventos"],
        al: ["Incluida", "Incluida", "Incluida", "Incluida", "Incluida", "Incluida"],
        ac: ["N/A", "N/A", "N/A", "N/A", "N/A", "N/A"]
    }
};

function formatoPesos(valor) {
    const numero = Number(String(valor).replace(/[^0-9.]/g, ""));
    if (!numero) return valor || "-";
    return numero.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });
}

function convertirPrecio(numeroTexto) {
    return Number(String(numeroTexto).replace(/[^0-9.]/g, "")) || Infinity;
}

function actualizarFecha() {
    fechaCoti.textContent = new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatearFechaInput(id) {
    const valor = document.getElementById(id).value;
    if (!valor) return "-";
    const [year, month, day] = valor.split("-");
    return `${day}/${month}/${year}`;
}

function obtenerPlanSeleccionado() {
    if (document.getElementById("unitModeUber").checked) return "uber";
    if (document.getElementById("unitModeMulti").checked) return "multiplataforma";
    if (document.getElementById("unitModeNormal").checked) return "particular";
    return "";
}

function obtenerTextoPlan() {
    if (document.getElementById("unitModeUber").checked) return "Uber";
    if (document.getElementById("unitModeMulti").checked) return "Multiplataforma";
    if (document.getElementById("unitModeNormal").checked) return "Particular";
    return "-";
}

function obtenerTipoCobertura() {
    if (document.getElementById("coberturaAmplia").checked) return "amplia";
    if (document.getElementById("coberturaLimitada").checked) return "limitada";
    if (document.getElementById("coberturaRC").checked) return "rc";
    return "amplia";
}

function obtenerTextoCobertura() {
    if (document.getElementById("coberturaAmplia").checked) return "Amplia";
    if (document.getElementById("coberturaLimitada").checked) return "Limitada";
    if (document.getElementById("coberturaRC").checked) return "Responsabilidad Civil";
    return "Amplia";
}

function obtenerAseguradorasSeleccionadas() {
    return aseguradoras
        .map((aseguradora, index) => ({ ...aseguradora, index, checked: document.getElementById(aseguradora.checkId).checked }))
        .filter(aseguradora => aseguradora.checked);
}

function debeMostrarValor(texto) {
    const normalizado = texto.toLowerCase();
    return normalizado.includes("valor factura") || normalizado.includes("valor convenido") || normalizado.includes("convenido +10") || normalizado.includes("convenido+10");
}

function obtenerSumaTexto(index) {
    const select = document.getElementById(sumaIds[index]);
    const input = document.getElementById(valorIds[index]);
    const suma = select?.value || "Seleccione";
    const valor = input?.value || "";
    if (suma === "Seleccione") return "-";
    if (debeMostrarValor(suma)) return valor ? formatoPesos(valor) : suma;
    return suma;
}

function sincronizarSumaAsegurada(index = null) {
    const indices = index === null ? [0, 1, 2, 3, 4, 5] : [index];
    indices.forEach((itemIndex) => {
        const rtInput = document.querySelectorAll(".sumaRt__Input")[itemIndex];
        if (rtInput) rtInput.value = obtenerSumaTexto(itemIndex);
    });
}

function configurarSumasAseguradas() {
    sumaIds.forEach((selectId, index) => {
        const select = document.getElementById(selectId);
        const input = document.getElementById(valorIds[index]);
        if (!select || !input) return;
        input.classList.add("valorOculto");
        select.addEventListener("change", () => {
            if (debeMostrarValor(select.value)) {
                input.classList.remove("valorOculto");
            } else {
                input.classList.add("valorOculto");
                input.value = "";
            }
            sincronizarSumaAsegurada(index);
        });
        input.addEventListener("input", () => sincronizarSumaAsegurada(index));
    });
}

function llenarInputs(selector, valores, incluyeAXA = true) {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach((input, index) => {
        const aseguradoraIndex = incluyeAXA ? index : index + 1;
        const estaSeleccionada = document.getElementById(aseguradoras[aseguradoraIndex].checkId).checked;
        input.value = estaSeleccionada ? valores[index] || "" : "";
    });
}

function llenarDeduciblesSinDeducible() {
    [".rcoDed__Input", ".gmDed__Input", ".avDed__Input", ".alDed__Input", ".acDed__Input"].forEach((selector) => {
        document.querySelectorAll(selector).forEach((input) => input.value = "Sin deducible");
    });
}

function llenarCoberturasAutomaticas() {
    const plan = obtenerPlanSeleccionado();
    if (!plan) return;
    const datos = datosPorPlan[plan];
    llenarInputs(".dm__Input", datos.dm, false);
    llenarInputs(".rb__Input", datos.rb, false);
    llenarInputs(".rc__Input", datos.rc);
    llenarInputs(".rcd__Input", datos.rcd);
    llenarInputs(".rco__Input", datos.rco);
    llenarInputs(".gm__Input", datos.gm);
    llenarInputs(".av__Input", datos.av);
    llenarInputs(".al__Input", datos.al);
    llenarInputs(".ac__Input", datos.ac);
    llenarDeduciblesSinDeducible();
    sincronizarSumaAsegurada();
    actualizarVisibilidadPorPlan();
    actualizarVisibilidadCobertura();
}

function setDisplayForElements(selector, ocultar) {
    document.querySelectorAll(selector).forEach((elemento) => elemento.style.display = ocultar ? "none" : "");
}

function actualizarVisibilidadPorPlan() {
    setDisplayForElements(".rowRco", obtenerPlanSeleccionado() === "particular");
}

function actualizarVisibilidadCobertura() {
    const tipo = obtenerTipoCobertura();
    setDisplayForElements(".rowDm", tipo === "limitada" || tipo === "rc");
    setDisplayForElements(".rowRobo", tipo === "rc");
}

function permitirSoloUno(ids) {
    const checks = ids.map(id => document.getElementById(id));
    checks.forEach((check) => {
        check.addEventListener("change", () => {
            if (check.checked) checks.forEach((otroCheck) => { if (otroCheck !== check) otroCheck.checked = false; });
            llenarCoberturasAutomaticas();
            actualizarVisibilidadPorPlan();
            actualizarVisibilidadCobertura();
        });
    });
}

function limpiarFormulario() {
    document.querySelectorAll("input").forEach((input) => {
        if (input.type === "checkbox") input.checked = false;
        else input.value = "";
    });
    document.querySelectorAll("select").forEach((select) => select.selectedIndex = 0);
    document.getElementById("coberturaAmplia").checked = true;
    correoAgente.textContent = "Correo:";
    extensionAgente.textContent = "Tel: 33 2878 5446 Ext:";
    document.querySelectorAll(".valorInput").forEach((input) => input.classList.add("valorOculto"));
    sincronizarSumaAsegurada();
    actualizarVisibilidadPorPlan();
    actualizarVisibilidadCobertura();
    actualizarFecha();
}

function valorDeLista(selector, index) {
    const elemento = Array.from(document.querySelectorAll(selector))[index];
    return elemento ? elemento.value || "-" : "-";
}

function obtenerValoresPDF(selector, seleccionadas) {
    return seleccionadas.map(aseguradora => valorDeLista(selector, aseguradora.index));
}

function obtenerValoresPDFSinAXA(selector, seleccionadas, axaSelector) {
    const inputs = Array.from(document.querySelectorAll(selector));
    return seleccionadas.map((aseguradora) => {
        if (aseguradora.index === 0) return document.querySelector(axaSelector)?.value || "-";
        return inputs[aseguradora.index - 1]?.value || "-";
    });
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
            resolve({ data: canvas.toDataURL("image/png"), width: img.naturalWidth, height: img.naturalHeight });
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
    doc.addImage(imagen.data, "PNG", x + (maxW - w) / 2, y + (maxH - h) / 2, w, h);
}

function agregarFilaPares(body, nombre, seleccionadas, sumaSelector, dedSelector, axaDedSelector = null) {
    const fila = [nombre];
    seleccionadas.forEach((aseguradora) => {
        fila.push(valorDeLista(sumaSelector, aseguradora.index));
        if (axaDedSelector && aseguradora.index === 0) {
            fila.push(document.querySelector(axaDedSelector)?.value || "-");
        } else if (axaDedSelector) {
            const dedInputs = Array.from(document.querySelectorAll(dedSelector));
            fila.push(dedInputs[aseguradora.index - 1]?.value || "-");
        } else {
            fila.push(valorDeLista(dedSelector, aseguradora.index));
        }
    });
    body.push(fila);
}

async function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("landscape", "mm", "letter");
    const seleccionadas = obtenerAseguradorasSeleccionadas();
    if (seleccionadas.length === 0) {
        alert("Selecciona al menos una aseguradora para generar el PDF.");
        return;
    }

    const logoSwartz = await cargarImagen("logo-Photoroom.png");
    const logosAseguradoras = {};
    for (const aseguradora of seleccionadas) logosAseguradoras[aseguradora.nombre] = await cargarImagen(aseguradora.logo);

    const costosTodos = Array.from(document.querySelectorAll(".price__Input"));
    const costosSinFormato = seleccionadas.map(aseguradora => costosTodos[aseguradora.index]?.value || "-");
    const costos = costosSinFormato.map(formatoPesos);
    const preciosNumericos = costosSinFormato.map(convertirPrecio);
    const precioMinimo = Math.min(...preciosNumericos);
    const formasPagoTodas = Array.from(document.querySelectorAll(".payment__Options"));
    const formasPago = seleccionadas.map(aseguradora => formasPagoTodas[aseguradora.index]?.innerText.replace(/\n/g, " / ") || "-");

    const azul = [49, 134, 245], azulClaro = [226, 239, 255], dorado = [193, 148, 93], grisTexto = [31, 41, 51];
    const verdeColumna = [218, 247, 224], verdeCosto = [190, 242, 203];

    if (logoSwartz) dibujarImagenAjustada(doc, logoSwartz, 14, 7, 44, 18);
    doc.setFont(undefined, "bold");
    doc.setTextColor(...grisTexto);
    doc.setFontSize(18);
    doc.text("Comparativa de Seguro de Auto", 70, 13);
    doc.setFontSize(12);
    doc.setTextColor(...azul);
    doc.text("Cliente", 70, 22);
    doc.text("Vehículo", 135, 22);
    doc.text("Agente", 205, 22);
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.setTextColor(...grisTexto);
    doc.text(document.getElementById("clientName").value || "-", 70, 27);
    doc.text(`Nac: ${formatearFechaInput("clientBdy")}`, 70, 32);
    doc.text(`C.P: ${document.getElementById("clientCP").value || "-"}`, 70, 37);
    doc.text(`${document.getElementById("unitYear").value || ""} ${document.getElementById("unitName").value || ""}`, 135, 27);
    doc.text(`Plan: ${obtenerTextoPlan()}`, 135, 32);
    doc.text(`Cobertura: ${obtenerTextoCobertura()}`, 135, 37);
    doc.text(agenteSelect.selectedOptions[0]?.textContent || "", 205, 27);
    doc.text((correoAgente.textContent || "").replace("Correo:", "Correo: "), 205, 32);
    doc.text(extensionAgente.textContent || "", 205, 37);
    doc.setFont(undefined, "bold");
    doc.setFontSize(9);
    doc.text(`Fecha: ${fechaCoti.textContent}`, 230, 13);
    doc.setDrawColor(...dorado);
    doc.setLineWidth(1.2);
    doc.line(14, 42, 265, 42);

    const headTop = ["Rubro"];
    const headSub = [""];
    seleccionadas.forEach(() => {
        headTop.push({ content: "", colSpan: 2 });
        headSub.push("Suma asegurada", "Deducible");
    });

    const body = [
        ["Costo Anual", ...costos.map(costo => ({ content: costo, colSpan: 2 }))],
        ["Formas de pago", ...formasPago.map(forma => ({ content: forma, colSpan: 2 }))]
    ];

    const tipoCobertura = obtenerTipoCobertura();
    if (tipoCobertura === "amplia") {
        agregarFilaPares(body, "Daños Materiales", seleccionadas, ".sumaSelect", ".dm__Input", "#dmAXA");
        body[body.length - 1] = ["Daños Materiales", ...seleccionadas.flatMap(a => [obtenerSumaTexto(a.index), a.index === 0 ? document.getElementById("dmAXA").value || "-" : Array.from(document.querySelectorAll(".dm__Input"))[a.index - 1]?.value || "-"])];
        agregarFilaPares(body, "Robo Total", seleccionadas, ".sumaRt__Input", ".rb__Input", "#rbAXA");
    }
    if (tipoCobertura === "limitada") agregarFilaPares(body, "Robo Total", seleccionadas, ".sumaRt__Input", ".rb__Input", "#rbAXA");

    agregarFilaPares(body, "Responsabilidad Civil Daños a Terceros", seleccionadas, ".rc__Input", ".rcd__Input");
    if (obtenerPlanSeleccionado() !== "particular") agregarFilaPares(body, "Responsabilidad Civil Ocupantes", seleccionadas, ".rco__Input", ".rcoDed__Input");
    agregarFilaPares(body, "Gastos Médicos Ocupantes", seleccionadas, ".gm__Input", ".gmDed__Input");
    agregarFilaPares(body, "Asistencia Vial", seleccionadas, ".av__Input", ".avDed__Input");
    agregarFilaPares(body, "Asistencia Legal", seleccionadas, ".al__Input", ".alDed__Input");
    agregarFilaPares(body, "Accidentes al Conductor", seleccionadas, ".ac__Input", ".acDed__Input");
    body.push(["No. Cotización", ...seleccionadas.map(a => ({ content: valorDeLista(".quote__Input", a.index), colSpan: 2 }))]);

    const pageWidth = doc.internal.pageSize.getWidth();
    const tableMargin = 10;
    const tableWidth = pageWidth - (tableMargin * 2);
    const rubroWidth = 34;
    const availableWidth = tableWidth - rubroWidth;
    const pairWidth = availableWidth / seleccionadas.length;
    const sumaWidth = pairWidth * 0.58;
    const deducibleWidth = pairWidth * 0.42;

    const columnStyles = {
        0: { halign: "left", fontStyle: "bold", cellWidth: rubroWidth, fillColor: azulClaro }
    };

    for (let index = 1; index <= seleccionadas.length * 2; index++) {
        const esSuma = index % 2 === 1;
        columnStyles[index] = {
            cellWidth: esSuma ? sumaWidth : deducibleWidth
        };
    }

    doc.autoTable({
        startY: 47,
        head: [headTop, headSub],
        body,
        theme: "grid",
        tableWidth,
        margin: { left: tableMargin, right: tableMargin },
        headStyles: { fillColor: [255, 255, 255], textColor: grisTexto, lineColor: dorado, lineWidth: 0.35, minCellHeight: 12 },
        styles: { fontSize: 6.8, halign: "center", valign: "middle", cellPadding: 1.45, lineColor: dorado, lineWidth: 0.18, overflow: "linebreak", minCellHeight: 8.5 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        columnStyles,
        didParseCell: function (data) {
            if (data.section === "body" && data.column.index > 0) {
                const costoIndex = Math.floor((data.column.index - 1) / 2);
                if (preciosNumericos[costoIndex] === precioMinimo) {
                    data.cell.styles.fillColor = verdeColumna;
                    data.cell.styles.textColor = [20, 90, 45];
                    data.cell.styles.fontStyle = "bold";
                }
            }
            if (data.section === "body" && data.row.index === 0) {
                data.cell.styles.fontSize = data.column.index === 0 ? 9 : 12;
                data.cell.styles.fontStyle = "bold";
                if (data.column.index > 0) {
                    const costoIndex = Math.floor((data.column.index - 1) / 2);
                    const esMasBarato = preciosNumericos[costoIndex] === precioMinimo;
                    data.cell.styles.textColor = esMasBarato ? [20, 120, 55] : [20, 80, 150];
                    data.cell.styles.fillColor = esMasBarato ? verdeCosto : [239, 246, 255];
                }
            }
        },
        didDrawCell: function (data) {
            if (data.section === "head" && data.row.index === 0 && data.column.index > 0) {
                const aseguradora = seleccionadas[Math.floor((data.column.index - 1) / 2)];
                if (aseguradora) dibujarImagenAjustada(doc, logosAseguradoras[aseguradora.nombre], data.cell.x + 2, data.cell.y + 1, data.cell.width - 4, data.cell.height - 2);
            }
        }
    });

    doc.setFontSize(7);
    doc.setTextColor(90, 90, 90);
    const notaVigencia = "Cotizaciones con vigencia de 15 dias naturales, excepto Qualitas con vigencia de 7 dias. Posterior a ese periodo, los costos pueden sufrir cambios sin previo aviso.";
    doc.text(doc.splitTextToSize(notaVigencia, 245), 14, 199);
    doc.text("Documento generado por Swartz Seguros y Contabilidad", 14, 207);

    const nombreCliente = document.getElementById("clientName").value || "cliente";
    const nombreArchivo = nombreCliente.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9ñ-]/g, "");
    doc.save(`comparativa-${nombreArchivo}.pdf`);
}

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

actualizarFecha();
configurarSumasAseguradas();
permitirSoloUno(["Femenino", "Masculino"]);
permitirSoloUno(["unitModeUber", "unitModeMulti", "unitModeNormal"]);
permitirSoloUno(["coberturaAmplia", "coberturaLimitada", "coberturaRC"]);
aseguradoras.forEach((aseguradora) => document.getElementById(aseguradora.checkId).addEventListener("change", llenarCoberturasAutomaticas));
document.getElementById("generarPDF").addEventListener("click", generarPDF);
document.getElementById("limpiarFormulario").addEventListener("click", limpiarFormulario);
llenarDeduciblesSinDeducible();
sincronizarSumaAsegurada();
actualizarVisibilidadCobertura();
