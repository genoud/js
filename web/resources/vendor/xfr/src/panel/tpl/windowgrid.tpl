<div class="grid-header">
    <div data-table-page-size class="no-padding col-lg-3 col-md-3 col-sm-4 pull-left">
    </div>
    <div data-table-form-search class="no-padding col-lg-6 col-md-6 col-sm-6 col-xs-12 pull-right">
    </div>
</div>
<table class="table table-fixed table-hover table-striped vbox-available-height">
    <thead>
        <tr>
            <th>Date</th>
            <th>Service</th>
            <th>P.L.</th>
            <th>Client</th>
            <th>Montant</th>
            <th>Montant Aju.</th>
            <th>Net a payer</th>
        </tr>
    </thead>
    <tbody>
        {{#data}}
        <tr>
            <td>{{dateEncais}}</td>
            <td>{{contrat.servicefacture.libelle}}</td>
            <td>{{contrat.numcontrat}}</td>
            <td>{{client.utilisateur.personne.nom}} {{client.utilisateur.personne.prenom}}</td>
            <td>{{montant}}</td>
            <td>{{montantAjustement}}</td>
            <td>{{montant+montantAjustement}}</td>
        </tr>
        {{/data}}
    </tbody>
</table>
