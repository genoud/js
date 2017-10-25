

<nav class="nav-breadcrumb">
    <ol class="cd-breadcrumb triangle custom-icons">
        {{#data.stepList}}
            <li class="{{itemClass}}" data-step="{{code}}"><a on-click='step-click' href="#" class="{{iconClass}}" aria-hidden="true">{{libelle}}</a></li>
        {{/data}}
        <!--
        <li class="current"><a href="#0" class="fa fa-file-text" aria-hidden="true">Selection Type article</a></li>
        <li><a href="#0" class="fa fa-align-justify" aria-hidden="true">Titre</a></li>
        <li class=""><a href="#0" class="fa fa-user" aria-hidden="true">Auteurs</a></li>
        <li><a href="#0" class="fa fa-usd" aria-hidden="true">Informations financières</a></li>
        <li><a href="#0" class="fa fa-puzzle-piece" aria-hidden="true">Section/Categorie</a></li>
        <li><a href="#0" class="fa fa-paragraph" aria-hidden="true">Abstract</a></li>
        <li><a href="#0" class="fa fa-italic" aria-hidden="true">Mots clés</a></li>
        <li><a href="#0" class="fa fa-plus-square" aria-hidden="true">Informations suplémentaires</a></li>
        <li><a href="#0" class="fa fa-comment-o" aria-hidden="true">Commentaires</a></li>
        <li><a href="#0" class="fa fa-file-text" aria-hidden="true">Interdire experts</a></li>
        <li><a href="#0" class="fa fa-file-text" aria-hidden="true">Pièces jointes</a></li>
        -->
    </ol>
</nav>

<div class="toolbar toolbar-top">
    <div class="pull-left back-btn-container">
        <button class="btn btn-flat btn-default" data-action="previous">Précédent</button>
    </div>
    <div class="pull-right next-btn-container">
        <button class="btn btn-flat btn-primary" data-action="next">Suivant</button>
    </div>
</div>
<h3>{{data.currentStep.title}}</h3>
<p>{{data.currentStep.description}}</p>
<div id="form-place" data-mode="edit">

</div>

<div class="toolbar toolbar-bottom">
    <div class="pull-left back-btn-container">
        <button class="btn btn-flat btn-default" data-action="previous">Précédent</button>
    </div>
    <div class="pull-right next-btn-container">
        <button class="btn btn-flat btn-primary" data-action="next">Suivant</button>
    </div>
</div>