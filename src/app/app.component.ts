import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from './chat.service';

export interface Images{
  path: string
}

export interface Message{
  author: string,
  message: string,
  time: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'jll-project';
  @ViewChild('search') search: ElementRef;

  loadImages = [944, 1011, 984, 500, 237, 200, 201, 300, 301].map((n) => `https://picsum.photos/id/${n}/900/300`);
  images = []
  showNavigationArrows = false;
  showNavigationIndicators = false;
  closeResult = '';
  imagesId = '';
  imageSelected = '';
  messages: Message[] = []
  now: Date = new Date();
  messagesReply = [
    'Sorry, but I can\'t help you',
    'Let me check it, please',
    'Have a good day'
  ]
  counter = 0
  messageDetails = new FormGroup({
    msg: new FormControl('')
  })

  constructor(config: NgbCarouselConfig, private modalService: NgbModal, private chatService: ChatService) {
    chatService.messages.subscribe(
      msg => {
        console.log('Response from websocket server: ', msg)
      }
    )

    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  sendMessage($event: KeyboardEvent){
    let currentHour = (this.now.getHours() + ':' + this.now.getMinutes()).toString()
    let message = {
      author: 'User',
      message: this.messageDetails.value['msg'],
      time: currentHour
    }

    if($event.key === 'Enter'){
      this.messageDetails.setValue({msg: ''})
      this.pushMessage(message)
      setTimeout(() => {
        this.sendMessageAssistant()
      }, 2000)
    }
  }

  sendMessageAssistant(){
    let currentHour = (this.now.getHours() + ':' + this.now.getMinutes()).toString()
    if(this.counter === 3){
      this.counter = 0
    }
    let message = {
      author: 'Assistant',
      message: this.messagesReply[this.counter],
      time: currentHour
    }
    this.counter++
    this.pushMessage(message)
  }

  ngOnInit(){
    let currentHour = (this.now.getHours() + ':' + this.now.getMinutes()).toString()
    let message = {
      author: 'Assistant',
      message: 'Hello, user. How can I help you?',
      time: currentHour
    }
    this.pushMessage(message)
    let images;
    for(let i = 0; i < this.loadImages.length; i++){
      images = {
        path: this.loadImages[i]
      }
      this.images.push(images)
    }
  }

  pushMessage(messageObj){
    this.chatService.messages.next(messageObj)
    this.messages.push(messageObj)
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  selectImage(content) {
    let imageUrl = content['target']['src']
    let separateIds = imageUrl.split('id/')
    this.imagesId = separateIds[1].split('/')
    this.imageSelected = `https://picsum.photos/id/${this.imagesId[0]}/900/300`
    document.getElementById('openModal').click()

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
