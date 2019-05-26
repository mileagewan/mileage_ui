<template>
  <div id='test'
       style='width:600px;height:600px'>

  </div>
</template>
<script>
import go from 'gojs'
export default {
  data () {
    return {}
  },
  created () { },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let $ = go.GraphObject.make
      let myDiagram = $(go.Diagram, 'test', {
        initialContentAlignment: go.Spot.Center,
        'undoManager.isEnabled': true,
        allowZoom: true,
        'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
        'clickCreatingTool.archetypeNodeData': { text: 'Node' }
        // 'commandHandler.copiesTree': true,
        // 'commandHandler.deletesTree': true,
        // 'draggingTool.dragsTree': true
      })
      myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        { background: '#ccc' },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        // define the node's outer shape, which will surround the TextBlock
        $(go.Shape, 'RoundedRectangle', {
          parameter1: 20, // the corner has a large radius
          fill: $(go.Brush, 'Linear', {
            0: 'rgb(254, 201, 0)',
            1: 'rgb(254, 162, 0)'
          }),
          stroke: null,
          portId: '', // this Shape is the Node's port, not the whole Node
          fromLinkable: true,
          fromLinkableSelfNode: true,
          fromLinkableDuplicates: true,
          toLinkable: true,
          toLinkableSelfNode: true,
          toLinkableDuplicates: true,
          cursor: 'pointer'
        }),
        $(
          go.TextBlock,
          {
            font: 'bold 11pt helvetica, bold arial, sans-serif',
            editable: true // editing the text automatically updates the model data
          },
          new go.Binding('text').makeTwoWay()
        )
      )
      myDiagram.nodeTemplate.selectionAdornmentTemplate = $(
        go.Adornment,
        'Spot',
        $(
          go.Panel,
          'Auto',
          $(go.Shape, { fill: null, stroke: 'red', strokeWidth: 2 }),
          $(go.Placeholder) // a Placeholder sizes itself to the selected Node
        ),
        // the button to create a 'next' node, at the top-right corner
        $(
          'Button',
          {
            alignment: go.Spot.TopRight,
            click: addNodeAndLink // this function is defined below
          },
          $(go.Shape, 'PlusLine', { width: 6, height: 6 })
        ) // end button
      ) // end Adornment
      function addNodeAndLink (e, obj) {
        var adornment = obj.part
        var diagram = e.diagram
        diagram.startTransaction('Add State')

        // get the node data for which the user clicked the button
        var fromNode = adornment.adornedPart
        var fromData = fromNode.data
        // create a new 'State' data object, positioned off to the right of the adorned Node
        var toData = { text: 'new' }
        var p = fromNode.location.copy()
        p.x += 200
        toData.loc = go.Point.stringify(p) // the 'loc' property is a string, not a Point object
        // add the new node data to the model
        var model = diagram.model
        model.addNodeData(toData)

        // create a link data from the old node data to the new node data
        var linkdata = {
          from: model.getKeyForNodeData(fromData), // or just: fromData.id
          to: model.getKeyForNodeData(toData),
          text: 'transition'
        }
        // and add the link data to the model
        model.addLinkData(linkdata)

        // select the new Node
        var newnode = diagram.findNodeForData(toData)
        diagram.select(newnode)

        diagram.commitTransaction('Add State')

        // if the new node is off-screen, scroll the diagram to show the new node
        diagram.scrollToRect(newnode.actualBounds)
      }
      myDiagram.linkTemplate = $(
        go.Link, // the whole link panel
        {
          curve: go.Link.Bezier,
          adjusting: go.Link.Stretch,
          reshapable: true,
          relinkableFrom: true,
          relinkableTo: true,
          toShortLength: 3
        },
        new go.Binding('points').makeTwoWay(),
        new go.Binding('curviness'),
        $(
          go.Shape, // the link shape
          { strokeWidth: 1.5 }
        ),
        $(
          go.Shape, // the arrowhead
          { toArrow: 'standard', stroke: null }
        ),
        $(
          go.Panel,
          'Auto',
          $(
            go.Shape, // the label background, which becomes transparent around the edges
            {
              fill: $(go.Brush, 'Radial', {
                0: 'rgb(255, 255, 255)',
                0.3: 'rgb(255, 255, 255)',
                1: 'rgba(255, 255, 255, 0)'
              }),
              stroke: null
            }
          ),
          $(
            go.TextBlock,
            'transition', // the label text
            {
              textAlign: 'center',
              font: '9pt helvetica, arial, sans-serif',
              margin: 4,
              editable: true // enable in-place editing
            },
            // editing the text automatically updates the model data
            new go.Binding('text').makeTwoWay()
          )
        )
      )

      let myModel = $(go.GraphLinksModel)
      myModel.nodeKeyProperty = 'id'
      myModel.nodeDataArray = [
        { id: 0, loc: '120 120', text: 'Initial' },
        { id: 1, loc: '330 120', text: 'First down' },
        { id: 2, loc: '226 376', text: 'First up' },
        { id: 3, loc: '60 276', text: 'Second down' },
        { id: 4, loc: '226 226', text: 'Wait' }
      ]
      myModel.linkDataArray = [
        { from: 0, to: 0, text: 'up or timer', curviness: -20 },
        { from: 0, to: 1, text: 'down', curviness: 20 },
        { from: 1, to: 0, text: 'up (moved)\nPOST', curviness: 20 },
        { from: 1, to: 1, text: 'down', curviness: -20 },
        { from: 1, to: 2, text: 'up (no move)' },
        { from: 1, to: 4, text: 'timer' },
        { from: 2, to: 0, text: 'timer\nPOST' },
        { from: 2, to: 3, text: 'down' },
        { from: 3, to: 0, text: 'up\nPOST\n(dblclick\nif no move)' },
        { from: 3, to: 3, text: 'down or timer', curviness: 20 },
        { from: 4, to: 0, text: 'up\nPOST' },
        { from: 4, to: 4, text: 'down' }
      ]
      myDiagram.model = myModel
    }
  }
}
</script>
