<form name="userfilterform" method="post" action="">
    <div class="form_group">
        <label for="stateprunt" class="required">Statut:</label>
        <select id="emprunt-form_etat" class="form-control" name="stateprunt">
            <option value="">Tous</option>
            <option value="Encours">En cours</option>
            <option value="Remboursé">Remboursés</option>
            <option value="Echec">Echec</option>
        </select>
    </div>
    <div class="form_group">
        <label for="dateDebut" class="required">Date début</label>
        <input type="text" id="filter-all-date-debut" name="dateDebut" required="required" class="form-control">
    </div>
    <div class="form_group">
        <label for="dateFin" class="required">Date fin</label>
        <input type="text" id="filter-all-date-fin" name="dateFin" required="required" class="form-control">
    </div>
    <div class="form_group">
        <label for="montantMin" class="required">Montant minimum</label>
        <input type="number" id="filter-all-montant-min" name="montantMin" required="required" class="form-control">
    </div>
    <div class="form_group">
        <label for="montantMax" class="required">Montant maximum</label>
        <input type="number" id="filter-all-montant-max" name="montantMax" required="required" class="form-control">
    </div>
    <div class="form_group">
        <label for="pme" class="required">PME</label>
        <select id="form_pme" class="select2-pme form-control" name="pme">
        </select>
    </div>
</form>
