import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

interface Partner {
  name: string;
  logo: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  contactForm: FormGroup;
  isSubmitting = false;
  currentSlide = 0;
  currentTestimonial = 0;
  private slideInterval: any;
  private testimonialInterval: any;
  

  heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Security personnel in professional uniforms'
    },
    {
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Students in school uniforms'
    },
    {
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Military personnel in dress uniforms'
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt: 'Professional uniform manufacturing'
    }
  ];

  services: Service[] = [
    {
      title: 'School Uniforms',
      description: 'Comfortable, durable uniforms designed for students of all ages. From elementary to university level, we provide uniforms that promote unity while ensuring comfort during long school days.',
      icon: '🎓'
    },
    {
      title: 'Security Uniforms',
      description: 'Professional security uniforms built for durability and functionality. Features include reinforced stitching, multiple pockets, and weather-resistant materials for all-day comfort.',
      icon: '🛡️'
    },
    {
      title: 'Armed Forces',
      description: 'Military-grade uniforms meeting strict standards for dress, combat, and ceremonial occasions. Precision-crafted with attention to detail and compliance with military specifications.',
      icon: '⭐'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'Principal',
      company: 'Nairobi International School',
      content: 'UniformGuard has been our trusted partner for over 5 years. The quality is exceptional and the service is always prompt. Our students look professional and feel confident.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Colonel James Mwangi',
      role: 'Procurement Officer',
      company: 'Kenya Defence Forces',
      content: 'The attention to detail and adherence to military specifications is outstanding. UniformGuard delivers uniforms that meet our exact requirements every time.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'David Ochieng',
      role: 'Operations Manager',
      company: 'SecureGuard Ltd',
      content: 'Our security team looks professional and feels comfortable throughout their shifts. The uniforms are durable and maintain their appearance even after multiple washes.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  partners: Partner[] = [
    { name: 'Kenya Defence Forces', logo: '/kdf.jpg' },
    { name: 'University of Nairobi', logo: '/UON.jpg' },
    { name: 'G4S Security', logo: '/G4S.png' },
    { name: 'Strathmore University', logo: '/strathmore.png' },
    { name: 'KK Security', logo: '/kk.jpg' },
    { name: 'Aga Khan Academy', logo: '/aga-khan.png' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      organizationType: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Auto-advance hero slides
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    }, 5000);

    // Auto-advance testimonials
    this.testimonialInterval = setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 7000);
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  setCurrentSlide(index: number) {
    this.currentSlide = index;
  }

  setCurrentTestimonial(index: number) {
    this.currentTestimonial = index;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting = false;
        this.contactForm.reset();
        alert('Thank you for your message! We will get back to you soon.');
      }, 2000);
    }
  }
}
