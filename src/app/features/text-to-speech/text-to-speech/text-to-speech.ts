import { Component, Input, signal } from '@angular/core';
import { TextToSpeechService } from '../../../data-access/text-to-speech/text-to-speech.service';
import { NzIconModule  } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'text-to-speech',
  imports: [
    CommonModule,
    NzIconModule
  ],
  templateUrl: './text-to-speech.html',
  styleUrl: './text-to-speech.css',
})
export class TextToSpeech {
  isLoading = signal(false);
  isSpeaking = signal(false)
  @Input() text: string | undefined = '';

  constructor(
    private readonly textToSpeechService: TextToSpeechService
  ){}

  onSpeech() {
    if (this.isSpeaking()) return;
    this.isSpeaking.set(true);
    if (this.text) {
    this.textToSpeechService.getAudio(this.text).subscribe({
      next: (blob) => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.isSpeaking.set(false)
        };
        audio.play();
      },
      error: (err) => {
        console.error(err)
        this.isSpeaking.set(false)
      }
    })
  }
  }
}
