<form name="advancedsearch" method="post" action="">
    <div class="row">
        <div class="col-xs-6 form_group">
            <label for="stateprunt" class="required">Statut:</label>
            <select id="emprunt-form_etat" class="form-control input-sm" name="stateprunt">
                <option value="">All</option>
                <option value="Encours">Incomplete submission</option>
                <option value="Remboursé">Submission sent back to author</option>
                <option value="Echec">Submission waiting for validation</option>
            </select>
        </div>
        <div class="col-xs-3 form_group">
            <label for="dateDebut" class="required">Start Date</label>
            <input type="text" id="filter-all-date-debut" name="dateDebut" required="required" class="form-control input-sm">
        </div>
        <div class="col-xs-3 form_group">
            <label for="dateFin" class="required">End Date</label>
            <input type="text" id="filter-all-date-fin" name="dateFin" required="required" class="form-control input-sm">
        </div>
    </div>

</form>
