<div>

        <div class="input-group input-group-sm">
            <input type="text" class="form-control" value="{{data.newKeyword}}" on-keypress="js-keypress">
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-info btn-flat" on-click="add-keyword">Add!</button>
                    </span>
        </div>

</div>
<div class="key-word">
    {{#data.motscles:index}}
        <!--<h3 class="js-keyword">-->
            <span class="label" style="
                    background: {{data.getColor(index)}};margin: 2px;
                    font-size:{{data.getFontSize(index)}};
                    display: inline-block;">
                {{this}}
                <span  class="js-label-btn" on-click="delete-keyword">
                    <i class="fa fa-trash"></i>
                </span>
            </span>
        <!--</h3>-->
    {{/data}}
</div>