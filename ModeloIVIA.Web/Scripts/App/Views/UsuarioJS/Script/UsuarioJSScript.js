﻿/// <reference path="../../Main/Namespace.js" />
/// <reference path="../ViewModel/UsuarioJSViewModel.js" />
/// <reference path="../Elementos/SliderCRUD.js" />
/// <reference path="../../../Servidor/Servidor.js" />
/// <reference path="../Elementos/Form.js" />


ModeloIVIA.Script.UsuarioJS = function UsuarioJSScript() {

    // Propriedades

    var that = this;
    that.viewModel = new ModeloIVIA.ViewModel.UsuarioJS();
    that.form = that.viewModel.form;
    that.tabelaUsuarios = that.viewModel.tabelaUsuarios;
    that.slider = that.viewModel.sliderCRUD;
    that.validador = that.viewModel.validador;


    // Comportamentos ======================================== /

    // Slide

    that.mudarSlide = function (event) {
        var elemento = $(event.currentTarget);
        var indiceSlide = elemento.attr('data-slide');
        that.slider.irParaSlide(indiceSlide);
        that.validador.removerTodos();
    };

    $("#crudSections a").click(that.mudarSlide);


    // CRUD

    that.obterUsuarioParaAlteracao = function (event) {
        event.preventDefault();
        var elemento = $(event.currentTarget);
        var url = elemento.attr('href');
        ModeloIVIA.Servidor.ajax({
            url: url,
            successCallback: function (resultado) {
                that.form.preencher(resultado.Dados);
            }
        });
        that.slider.irParaSlide(1);
    };

    $(that.tabelaUsuarios.obterTodasAsLinhas()).find('.alterar').click(that.obterUsuarioParaAlteracao);

    that.limparCamposForm = function (event) {
        event.preventDefault();
        that.form.limpar();
    };

    $('#limparForm').click(that.limparCamposForm);

    that.obterCidadesPorEstado = function (event) {
        var elemento = $(event.currentTarget);
        var idEstado = elemento.children(':selected').val();
        var parametros = "idEstado=" + idEstado;
        ModeloIVIA.Servidor.ajax({
            url: "/UsuarioJS/ObterCidadesPorEstado",
            parametros: parametros,
            successCallback: function (resultado) {
                $('select[name=Cidade]').append(new Option('Selecione'));
                $.each(resultado.Dados, function (cont, cidade) {
                    $('select[name=Cidade]').append(new Option(cidade.Descricao, cidade.Id));
                });
            }
        });
    };

    $('select[name=Estado]').change(that.obterCidadesPorEstado);
};


// Carregamento do script de usuário no onload do DOM.

$(function () {
    var usuarioScript = new ModeloIVIA.Script.UsuarioJS();
});