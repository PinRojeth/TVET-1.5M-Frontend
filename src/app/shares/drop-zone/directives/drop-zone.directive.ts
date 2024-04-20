import { Directive, HostBinding, Output, EventEmitter, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() fileDropped = new EventEmitter<any>();

  isMultiple: boolean = false;
  @Input()
  set multiple(value: any) {
    this.isMultiple = value === "" || value === "true" || value === true;
  }

  @HostBinding('class')
  elementClass = 'drop-zone';

  @HostBinding('class.fileover') fileOver: boolean;
  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer.files as FileList;
    this.fileDropped.emit(files);
  }
}
