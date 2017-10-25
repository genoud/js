<div>
    <form>
        <div class="input-group input-group-sm">
            <input type="text" class="form-control" value="{{newKeyword}}">
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-info btn-flat" on-click="add-keyword">Add!</button>
                    </span>
        </div>
    </form>
</div>
<div class="key-word">
    {{#data.motscles}}
        <span class="label label-success">{{this}}<span class="badge bg-green" on-click="deleete-keyword">x</span></span>
    {{/data}}
</div>