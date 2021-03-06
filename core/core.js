YUI().add('ys_core', function(Y) {

	var NS = 'ys',

		Core = function()
		{
			Core.superclass.constructor.apply(this, arguments);
		};

	Y.namespace(NS).Coord = new Y.Model();

	Y.extend(Core, Y.Controller, {
		_updateAttrs: function(attrs, params)
		{
			var attrsp = {};

			Y.Object.each(
				attrs,
				function(v, k)
				{
					Y[NS].Coord.addAttr(
						k, {}
					);

					if (Y.Lang.isObject(v))
					{
						attrsp[k] = this._substituteObj(v, params);
					}
					else if (Y.Lang.isString(v))
					{
						attrsp[k] = this._substitute(v, params);
					}
				},
				this
			);
			Y[NS].Coord.setAttrs(attrsp);
		},
		_substitute: function(v, params)
		{
			return Y.substitute(
				v,
				params
			);
		},
		_substituteObj: function(v, params)
		{
			var newo = {};
			Y.Object.each(
				v,
				function(i, k)
				{
					newo[k] = this._substitute(i, params);
				},
				this
			);
			return newo;
		}
	},
	{
		NAME: 'Core'
	});

	Y.namespace(NS).Controller = new Core({
		root: '/~hadrien/obv4pre/admin/' // remove that
	});

	/**
	 * Method to enhance a link to save its href to controller
	 */
	Y.namespace(NS).Controller.enhance = function(links)
	{
		if (links._node)
		{
			links = Y.all(links._node);
		}

		links.each(
			function(link)
			{
				this._enhance(link)
			},
			this
		);
	};
	Y.namespace(NS).Controller._enhance = function(link)
	{
		link.on(
			'click',
			function(e, link)
			{
				if (e.button !== 1 || e.ctrlKey || e.metaKey) {
					return;
				}

				e.preventDefault();

				this.save(
					this.removeRoot(link.get('href'))
				);
			},
			this,
			link
		);
	};

	Y.Array.each(
		Y[NS].routes,
		function(r)
		{
			Y[NS].Controller.route(
				r.path,
				Y.bind(
					function(attrs, req)
					{
						this._updateAttrs(attrs, req.params);
					},
					Y[NS].Controller,
					r
				)
			);
		}
	);

}, '1.0', {requires: ["controller", "model", "ys_routes", "substitute", "ys_l10n"]})