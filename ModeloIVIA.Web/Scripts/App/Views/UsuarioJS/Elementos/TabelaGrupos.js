﻿/// <reference path="../../Main/Namespace.js" />

ModeloIVIA.Elemento.TabelaGrupos = function TabelaGrupos(idTabela) {

    // Construtor SuperTipo

    ModeloIVIA.Componente.DataTables.call(this, idTabela);

};

ModeloIVIA.Elemento.TabelaGrupos.prototype = new ModeloIVIA.Componente.DataTables();