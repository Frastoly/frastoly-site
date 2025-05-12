class TutorialSystem {
    constructor() {
        this.tutorials = {
            orientation: {
                id: 'orientation',
                title: 'Ghost Protocol Oryantasyonu',
                description: 'Ghost Protocol\'e hoş geldin çaylak. Yeteneklerini görmek için sana özel bir sanal kum havuzu hazırladık.',
                steps: [
                    {
                        id: 'basic_commands',
                        description: 'Temel komutları öğren',
                        commands: ['help', 'clear', 'ls_sim'],
                        hints: [
                            'Temel komutları görmek için help yazabilirsin',
                            'Ekranı temizlemek için clear kullanabilirsin',
                            'Dosyaları listelemek için ls_sim komutunu dene'
                        ]
                    },
                    {
                        id: 'file_operations',
                        description: 'Dosya işlemlerini öğren',
                        commands: ['read_file_sim', 'unlock_secure_file_sim'],
                        hints: [
                            'Dosya içeriğini okumak için read_file_sim kullan',
                            'Şifreli dosyayı açmak için unlock_secure_file_sim kullan'
                        ]
                    },
                    {
                        id: 'network_scan',
                        description: 'Ağ taraması yap',
                        commands: ['scan_basic_sim', 'report_active_server'],
                        hints: [
                            'Ağı taramak için scan_basic_sim kullan',
                            'Aktif sunucuyu raporlamak için report_active_server kullan'
                        ]
                    }
                ]
            }
        };

        this.playerProgress = {
            completedTutorials: new Set(),
            currentTutorial: null,
            currentStep: 0,
            errorCount: 0,
            activeHints: new Map() // stepId -> hintIndex
        };
    }

    startTutorial(tutorialId) {
        const tutorial = this.tutorials[tutorialId];
        if (!tutorial) return false;

        this.playerProgress.currentTutorial = tutorialId;
        this.playerProgress.currentStep = 0;
        this.playerProgress.errorCount = 0;
        this.playerProgress.activeHints.clear();

        return tutorial;
    }

    checkCommand(command, stepId) {
        if (!this.playerProgress.currentTutorial) return false;

        const tutorial = this.tutorials[this.playerProgress.currentTutorial];
        const step = tutorial.steps.find(s => s.id === stepId);
        
        if (!step) return false;

        const isValidCommand = step.commands.some(cmd => command.startsWith(cmd));
        
        if (!isValidCommand) {
            this.playerProgress.errorCount++;
            
            // 3 hata sonrası öğretici tetikleme
            if (this.playerProgress.errorCount >= 3) {
                this.triggerTutorial(stepId);
            }
            
            return false;
        }

        // Başarılı komut
        this.playerProgress.errorCount = 0;
        return true;
    }

    triggerTutorial(stepId) {
        const tutorial = this.tutorials[this.playerProgress.currentTutorial];
        const step = tutorial.steps.find(s => s.id === stepId);
        
        if (!step) return null;

        // Öğretici için özel bir ortam oluştur
        return {
            type: 'tutorial',
            stepId: stepId,
            description: step.description,
            commands: step.commands,
            hints: step.hints
        };
    }

    getNextHint(stepId) {
        if (!this.playerProgress.activeHints.has(stepId)) {
            this.playerProgress.activeHints.set(stepId, 0);
        }

        const tutorial = this.tutorials[this.playerProgress.currentTutorial];
        const step = tutorial.steps.find(s => s.id === stepId);
        
        if (!step) return null;

        const hintIndex = this.playerProgress.activeHints.get(stepId);
        if (hintIndex >= step.hints.length) return null;

        this.playerProgress.activeHints.set(stepId, hintIndex + 1);
        return step.hints[hintIndex];
    }

    completeStep(stepId) {
        const tutorial = this.tutorials[this.playerProgress.currentTutorial];
        const stepIndex = tutorial.steps.findIndex(s => s.id === stepId);
        
        if (stepIndex === -1) return false;

        this.playerProgress.currentStep = stepIndex + 1;
        this.playerProgress.errorCount = 0;
        this.playerProgress.activeHints.delete(stepId);

        // Tüm adımlar tamamlandı mı?
        if (this.playerProgress.currentStep >= tutorial.steps.length) {
            this.playerProgress.completedTutorials.add(this.playerProgress.currentTutorial);
            this.playerProgress.currentTutorial = null;
            return true;
        }

        return false;
    }

    isTutorialCompleted(tutorialId) {
        return this.playerProgress.completedTutorials.has(tutorialId);
    }
} 