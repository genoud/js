<div class="modal fade xfr-mask xfr-mask-{{size}}" role="dialog">
    <div class="modal-dialog modal-dialog-center">
        <div class="modal-content">
            <div class="modal-header" >
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" data-title=""> {{title}}</h4>
            </div>
            <div class="modal-body" style="height : 60%;">
                <div class="form_group"><label for="montant_physique" class="required" aria-required="true">Montant Physique</label>
                    <input type="text" id="montant_physique" required="required" class="form-control"  aria-required="true"></div>
                <div class="form_group"><label for="montant_rembourse" class="required" aria-required="true">Reste à rembourser</label>
                    <input type="text" id="montant_rembourse" required="required" class="form-control" disabled="" aria-required="true"></div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary xfr-inner-msg-btn" data-dismiss="modal" btn-text="Save"  id="amount-dialog-btn-save">Save</button>                
            </div>

        </div>
    </div>
</div>





