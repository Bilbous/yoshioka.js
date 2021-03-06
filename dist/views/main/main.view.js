YUI().add('yourapp_main_view', function(Y) {

	var NS = 'yourapp',
		
		MainView = function(config)
		{
			MainView.superclass.constructor.apply(this, arguments);
		};
	
	/**
	 * Main view
	 */
	Y.namespace(NS).MainView = Y.extend(MainView, Y.ys.View, {
		template: {$main.tpl},
		
		/**
		 * Render main view :
		 * - append header view
		 * - append footer view
		 * - listen to Y.ys.Coord 'mainviewChange' event to load it
		 */
		render: function()
		{
			var node = this.template;
			
			this.container.append(node);
			
			return this.container;
		}
	},
	{
		NAME: 'MainView'
	});
	
}, '1.0', {requires: ["ys_view", "substitute", "main_skin"]})