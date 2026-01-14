// Outfit Recommendation Engine
class OutfitRecommender {
  constructor() {
    this.colorDatabase = this.initializeColorDatabase();
  }

  initializeColorDatabase() {
    return {
      // Colors for different skin tones
      fair: {
        best: ['#E6B8AF', '#F4CCCC', '#D5A6BD', '#B4A7D6', '#A2C4C9'],
        avoid: ['#000000', '#8B4513']
      },
      light: {
        best: ['#87CEEB', '#FFB6C1', '#DDA0DD', '#F0E68C', '#98FB98'],
        avoid: ['#FFFF00', '#00FF00']
      },
      medium: {
        best: ['#FF6347', '#4169E1', '#32CD32', '#FF8C00', '#9370DB'],
        avoid: ['#D2691E', '#A0522D']
      },
      tan: {
        best: ['#DC143C', '#4B0082', '#008080', '#FF1493', '#2E8B57'],
        avoid: ['#F4A460', '#D2B48C']
      },
      dark: {
        best: ['#FFD700', '#00CED1', '#FF69B4', '#7FFF00', '#FF4500'],
        avoid: ['#2F4F4F', '#1C1C1C']
      },
      deep: {
        best: ['#FFFFFF', '#FF0000', '#00FFFF', '#FFFF00', '#FF00FF'],
        avoid: ['#000000', '#3E2723']
      }
    };
  }

  recommendColors(skinTone) {
    const toneColors = this.colorDatabase[skinTone] || this.colorDatabase.light;
    return toneColors.best.slice(0, 5).map(hex => this.getColorName(hex));
  }

  getColorName(hex) {
    const colorNames = {
      '#E6B8AF': { name: 'Soft Peach', hex },
      '#F4CCCC': { name: 'Light Pink', hex },
      '#D5A6BD': { name: 'Dusty Rose', hex },
      '#B4A7D6': { name: 'Lavender', hex },
      '#A2C4C9': { name: 'Powder Blue', hex },
      '#87CEEB': { name: 'Sky Blue', hex },
      '#FFB6C1': { name: 'Light Pink', hex },
      '#DDA0DD': { name: 'Plum', hex },
      '#F0E68C': { name: 'Khaki', hex },
      '#98FB98': { name: 'Pale Green', hex },
      '#FF6347': { name: 'Tomato Red', hex },
      '#4169E1': { name: 'Royal Blue', hex },
      '#32CD32': { name: 'Lime Green', hex },
      '#FF8C00': { name: 'Dark Orange', hex },
      '#9370DB': { name: 'Medium Purple', hex },
      '#DC143C': { name: 'Crimson', hex },
      '#4B0082': { name: 'Indigo', hex },
      '#008080': { name: 'Teal', hex },
      '#FF1493': { name: 'Deep Pink', hex },
      '#2E8B57': { name: 'Sea Green', hex },
      '#FFD700': { name: 'Gold', hex },
      '#00CED1': { name: 'Dark Turquoise', hex },
      '#FF69B4': { name: 'Hot Pink', hex },
      '#7FFF00': { name: 'Chartreuse', hex },
      '#FF4500': { name: 'Orange Red', hex },
      '#FFFFFF': { name: 'White', hex },
      '#FF0000': { name: 'Red', hex },
      '#00FFFF': { name: 'Cyan', hex },
      '#FFFF00': { name: 'Yellow', hex },
      '#FF00FF': { name: 'Magenta', hex }
    };
    return colorNames[hex] || { name: 'Custom Color', hex };
  }

  recommendStyles(gender, bodyType, height, occasion) {
    const styles = [];

    if (gender === 'male') {
      if (occasion === 'formal') {
        styles.push({
          icon: '🤵',
          name: 'Tailored Suit',
          description: 'Classic two-piece suit with a crisp dress shirt and tie. Perfect for formal events.'
        });
        if (bodyType === 'athletic' || bodyType === 'average') {
          styles.push({
            icon: '👔',
            name: 'Slim Fit Blazer',
            description: 'Modern slim-fit blazer paired with dress pants for a sophisticated look.'
          });
        }
      } else if (occasion === 'casual') {
        styles.push({
          icon: '👕',
          name: 'Casual T-Shirt & Jeans',
          description: 'Comfortable cotton t-shirt with well-fitted jeans for everyday wear.'
        });
        if (height === 'tall') {
          styles.push({
            icon: '👖',
            name: 'Long Sleeve Henley',
            description: 'Stylish henley shirt that complements your height with dark chinos.'
          });
        }
      } else if (occasion === 'sports') {
        styles.push({
          icon: '🏃',
          name: 'Athletic Wear',
          description: 'Breathable sports shirt with performance shorts or joggers.'
        });
      }
    } else {
      if (occasion === 'formal') {
        styles.push({
          icon: '👗',
          name: 'Evening Gown',
          description: 'Elegant floor-length dress perfect for formal occasions and events.'
        });
        if (bodyType === 'slim' || bodyType === 'average') {
          styles.push({
            icon: '💼',
            name: 'Pencil Skirt Suit',
            description: 'Professional blazer with pencil skirt for business formal settings.'
          });
        }
      } else if (occasion === 'casual') {
        styles.push({
          icon: '👚',
          name: 'Casual Top & Jeans',
          description: 'Comfortable blouse or t-shirt paired with stylish jeans.'
        });
        if (bodyType === 'athletic') {
          styles.push({
            icon: '👗',
            name: 'Fit & Flare Dress',
            description: 'Flattering dress that accentuates your athletic build.'
          });
        }
      } else if (occasion === 'party') {
        styles.push({
          icon: '✨',
          name: 'Cocktail Dress',
          description: 'Stylish knee-length dress perfect for parties and celebrations.'
        });
      }
    }

    return styles.slice(0, 3);
  }

  generateTips(formData) {
    const tips = [];
    const { gender, skinTone, height, bodyType, occasion, season } = formData;

    // Height-based tips
    if (height === 'short') {
      tips.push('Opt for monochromatic outfits to create a lengthening effect');
      tips.push('High-waisted bottoms can make legs appear longer');
    } else if (height === 'tall') {
      tips.push('Horizontal stripes and patterns work well with your height');
      tips.push('Layer different pieces to add visual interest');
    }

    // Body type tips
    if (bodyType === 'slim') {
      tips.push('Add layers and textures to create more dimension');
      tips.push('Patterns and prints can add visual volume');
    } else if (bodyType === 'athletic') {
      tips.push('Fitted clothing showcases your athletic build beautifully');
      tips.push('V-necks and scoop necks balance broad shoulders');
    } else if (bodyType === 'heavyset') {
      tips.push('Dark colors create a slimming silhouette');
      tips.push('Well-tailored clothing provides the best fit and comfort');
    }

    // Skin tone tips
    if (['dark', 'deep'].includes(skinTone)) {
      tips.push('Bright and vibrant colors complement your skin tone beautifully');
    } else if (['fair', 'light'].includes(skinTone)) {
      tips.push('Pastel and muted tones create a harmonious look');
    }

    // Season tips
    if (season === 'summer') {
      tips.push('Choose breathable fabrics like cotton and linen');
      tips.push('Lighter colors reflect heat and keep you cooler');
    } else if (season === 'winter') {
      tips.push('Layer with sweaters and jackets for warmth and style');
      tips.push('Rich, deep colors work well in winter months');
    }

    // Occasion tips
    if (occasion === 'formal') {
      tips.push('Ensure clothing is well-pressed and perfectly fitted');
      tips.push('Quality accessories elevate the entire outfit');
    }

    return tips.slice(0, 5);
  }

  getColorReasoning(skinTone) {
    const reasonings = {
      fair: 'For fair skin tones, soft pastels and muted colors create a beautiful, harmonious look without overwhelming your natural complexion.',
      light: 'Light skin tones are complemented by cool and warm medium-toned colors that add vibrancy without being too harsh.',
      medium: 'Medium skin tones have great versatility! Bold and vibrant colors enhance your natural warmth and create stunning contrast.',
      tan: 'Tan skin tones look amazing in rich jewel tones and saturated colors that bring out the golden undertones.',
      dark: 'Dark skin tones are beautifully enhanced by bright, bold colors that create striking contrast and showcase your natural richness.',
      deep: 'Deep skin tones shine in high-contrast colors - both bright vibrant hues and crisp whites create stunning visual impact.'
    };
    return reasonings[skinTone] || reasonings.medium;
  }

  getRecommendations(formData) {
    const { gender, skinTone, height, bodyType, occasion, season } = formData;

    return {
      colors: this.recommendColors(skinTone),
      colorReasoning: this.getColorReasoning(skinTone),
      styles: this.recommendStyles(gender, bodyType, height, occasion),
      tips: this.generateTips(formData),
      metadata: {
        confidence: 'high',
        processingTime: Date.now()
      }
    };
  }
}

module.exports = OutfitRecommender;
