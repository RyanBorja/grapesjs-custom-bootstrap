export default (editor, config = {}) => {
    const panelManager = editor.Panels;
    const addButtonToPanels = btn => panelManager.addButton('options', btn);
    const panelButtons = [
        {id: 'undo', className: 'fa fa-undo', command: e => e.runCommand('core:undo'), attributes: { title: 'Undo'}, active: false,},
        {id: 'redo', className: 'fa fa-repeat', command: e => e.runCommand('core:redo'), attributes: { title: 'Redo'}, active: false,},
        {id: 'gjs-open-import-webpage', className: 'fa fa-download', command: 'gjs-open-import-webpage', attributes: { title: 'Import'}, active: false,},
        {id: 'canvas-clear', className: 'fa fa-trash', command: 'canvas-clear', attributes: { title: 'Clear Canvas'}, active: false,},
        {id: 'About', className: 'fa fa-question-circle', command: 'about-modal', attributes: { title: 'About'}, active: false,},
    ];
    panelButtons.forEach(addButtonToPanels);
	
	const commands = editor.Commands;
	commands.add('gjs-open-import-webpage', openImport(editor));
	commands.add('canvas-clear', e => confirm('Are you sure you want to clear the canvas?') && e.runCommand('core:canvas-clear'));
	commands.add('about-modal', aboutModal(editor));
}

function openImport(editor) {
	let config = { inmportViewerOptions: {} };
	const pfx = editor.getConfig('stylePrefix');
	const modal = editor.Modal;
	const codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
	const container = document.createElement('div');
	const importLabel = '<div style="margin-bottom: 10px; font-size: 13px;">Paste your HTML/CSS and click Import</div>';
	const importCnt = (editor) => editor.getHtml() + '<style>' + editor.getCss() + '</style>';
	let viewerEditor = codeViewer.editor;

	// Init import button
	const btnImp = document.createElement('button');
	btnImp.type = 'button';
	btnImp.innerHTML = 'Import';
	btnImp.className = `${pfx}btn-prim ${pfx}btn-import`;
	btnImp.onclick = e => {
		editor.setComponents(viewerEditor.getValue().trim());
		modal.close();
	};

	// Init code viewer
	codeViewer.set({ ...{
		codeName: 'htmlmixed',
		theme: 'hopscotch',
		readOnly: 0
		}, ...config.importViewerOptions });

	return {
		run(editor) {
			if (!viewerEditor) {
				const txtarea = document.createElement('textarea');
				
				if (importLabel) {
					const labelEl = document.createElement('div');
					labelEl.className = `${pfx}import-label`;
					labelEl.innerHTML = importLabel;
					container.appendChild(labelEl);
				}
	
				container.appendChild(txtarea);
				container.appendChild(btnImp);
				codeViewer.init(txtarea);
				viewerEditor = codeViewer.editor;
			}
	
			modal.setTitle('Import Template');
			modal.setContent(container);
			const cnt = typeof importCnt == 'function' ? importCnt(editor) : importCnt;
			codeViewer.setContent(cnt || '');
			modal.open().getModel()
			.once('change:open', () => editor.stopCommand(this.id));
			viewerEditor.refresh();
		},
	
		stop() {
			modal.close();
		}
	}
}

function aboutModal(editor) {
	const modal = editor.Modal;
    const modalTitle = 'Welcome!';
	const container = `
		<div>
			<ul>
				<li>Double-click to edit a component.</li>
            	<li>Changes save automatically.</li>
				<li>You cannot nest "conainter" blocks.</li>
				<li>Containers have a fixed width. If you want a full-width container, use "container-fluid".</li>
				<li>Use "row" blocks to house collectoin of "columns".</li>
				<li>Put your content within "columns" to fully utilize the responsive nature of Bootstrap.</li>
				<li>Use the traits panel to adjust the width of your columns. Width is abstracted as 1 throug 12.</li>
				<li>Use xs, sm, md, and lg to set breakpoints for responsive column widths at certain screen sizes.</li>
			</ul>
		</div>`;
    
	return {
		run(editor) {
			modal.setTitle(modalTitle);
			modal.setContent(container);
			modal.open().getModel()
			.once('change:open', () => editor.stopCommand(this.id));
		},
	
		stop() {
			modal.close();
		}
	};
}
      