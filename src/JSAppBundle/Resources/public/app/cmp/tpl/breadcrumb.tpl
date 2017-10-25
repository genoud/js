<section class="content-header">
    <h1>
        {{data.currentPanel.getTitle()}}
        <small>{{data.currentPanel.getSubtitle()}}</small>
    </h1>
    <ol class="breadcrumb">
        {{# data.panelStack:index}}
            <li><a href="#" on-click="click"><i class=""></i> {{config.title}}</a></li>
        {{/data}}
    </ol>
</section>