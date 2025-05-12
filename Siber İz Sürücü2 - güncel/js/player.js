class Player {
    constructor() {
        // Temel özellikler
        this.level = 1;
        this.xp = 0;
        this.money = 1000;
        this.reputation = 0;
        
        // Karakter sınıfı ve yetenekler
        this.characterClass = null;
        this.skills = {
            hacking: 1,
            networking: 1,
            cryptography: 1,
            socialEngineering: 1
        };
        
        // İlerleme sistemi
        this.xpToNextLevel = 100;
        this.skillPoints = 0;
        
        // Ekipman ve araçlar
        this.equipment = [];
        this.tools = [];
        
        // Görev sistemi
        this.currentMission = null;
        this.completedSteps = [];
        this.completedMissions = [];
        
        // İlişki sistemi
        this.relationships = {
            ghostProtocol: 0,
            rivalGroups: 0,
            corporations: 0
        };
        
        // Dünya durumu
        this.worldState = {
            globalChaosLevel: 0,
            publicTrustInTech: 0,
            majorCorpStability: 0,
            rivalHackerGroupPower: 0
        };
        
        // Karar geçmişi
        this.decisionHistory = [];
        
        // İstatistikler
        this.stats = {
            missionsCompleted: 0,
            totalEarnings: 0,
            successfulHacks: 0,
            failedHacks: 0,
            reputationGained: 0,
            reputationLost: 0
        };
    }

    // Karakter sınıfı seçimi
    selectClass(className) {
        const classes = {
            'social_engineer': {
                name: 'Sosyal Mühendis',
                bonus: {
                    socialEngineering: 2,
                    reputation: 1
                },
                specialAbility: 'manipulation'
            },
            'technical_expert': {
                name: 'Teknik Uzman',
                bonus: {
                    hacking: 2,
                    networking: 1
                },
                specialAbility: 'system_analysis'
            },
            'strategist': {
                name: 'Stratejist',
                bonus: {
                    cryptography: 2,
                    socialEngineering: 1
                },
                specialAbility: 'planning'
            }
        };

        if (classes[className]) {
            this.characterClass = classes[className];
            // Sınıf bonuslarını uygula
            Object.entries(this.characterClass.bonus).forEach(([skill, value]) => {
                if (this.skills[skill]) {
                    this.skills[skill] += value;
                }
            });
            return true;
        }
        return false;
    }

    // XP ve seviye sistemi
    gainXP(amount) {
        this.xp += amount;
        while (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.xp -= this.xpToNextLevel;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
        this.skillPoints += 2;
        
        // Seviye atlama bonusları
        this.money += 1000;
        this.reputation += 1;
    }

    // Yetenek geliştirme
    improveSkill(skill, amount = 1) {
        if (this.skillPoints >= amount && this.skills[skill]) {
            this.skills[skill] += amount;
            this.skillPoints -= amount;
            return true;
        }
        return false;
    }

    // Ekipman yönetimi
    addEquipment(item) {
        if (this.equipment.length < 5) { // Maksimum 5 ekipman
            this.equipment.push(item);
            // Ekipman bonuslarını uygula
            if (item.bonus) {
                Object.entries(item.bonus).forEach(([skill, value]) => {
                    if (this.skills[skill]) {
                        this.skills[skill] += value;
                    }
                });
            }
            return true;
        }
        return false;
    }

    removeEquipment(item) {
        const index = this.equipment.indexOf(item);
        if (index > -1) {
            this.equipment.splice(index, 1);
            // Ekipman bonuslarını kaldır
            if (item.bonus) {
                Object.entries(item.bonus).forEach(([skill, value]) => {
                    if (this.skills[skill]) {
                        this.skills[skill] -= value;
                    }
                });
            }
            return true;
        }
        return false;
    }

    // Araç yönetimi
    addTool(tool) {
        if (!this.tools.includes(tool)) {
            this.tools.push(tool);
            return true;
        }
        return false;
    }

    removeTool(tool) {
        const index = this.tools.indexOf(tool);
        if (index > -1) {
            this.tools.splice(index, 1);
            return true;
        }
        return false;
    }

    // Görev sistemi
    startMission(mission) {
        if (!this.currentMission) {
            this.currentMission = mission;
            this.completedSteps = [];
            return true;
        }
        return false;
    }

    completeStep(step) {
        if (this.currentMission && !this.completedSteps.includes(step)) {
            this.completedSteps.push(step);
            return true;
        }
        return false;
    }

    completeMission() {
        if (this.currentMission) {
            this.completedMissions.push(this.currentMission.id);
            this.stats.missionsCompleted++;
            this.currentMission = null;
            this.completedSteps = [];
            return true;
        }
        return false;
    }

    // İlişki sistemi
    updateRelationship(group, amount) {
        if (this.relationships.hasOwnProperty(group)) {
            this.relationships[group] += amount;
            // İstatistikleri güncelle
            if (amount > 0) {
                this.stats.reputationGained += amount;
            } else {
                this.stats.reputationLost += Math.abs(amount);
            }
            return true;
        }
        return false;
    }

    // Dünya durumu
    updateWorldState(state, value) {
        if (this.worldState.hasOwnProperty(state)) {
            this.worldState[state] += value;
            return true;
        }
        return false;
    }

    // Karar sistemi
    makeDecision(decision) {
        this.decisionHistory.push({
            time: new Date(),
            decision: decision,
            consequences: decision.consequences
        });
        
        // Kararın sonuçlarını uygula
        if (decision.consequences) {
            if (decision.consequences.reputation) {
                this.reputation += decision.consequences.reputation;
            }
            if (decision.consequences.money) {
                this.money += decision.consequences.money;
                this.stats.totalEarnings += decision.consequences.money;
            }
            if (decision.consequences.worldState) {
                Object.entries(decision.consequences.worldState).forEach(([state, value]) => {
                    this.updateWorldState(state, value);
                });
            }
        }
    }

    // İstatistikler
    getStats() {
        return {
            ...this.stats,
            level: this.level,
            xp: this.xp,
            xpToNextLevel: this.xpToNextLevel,
            money: this.money,
            reputation: this.reputation,
            skills: this.skills,
            completedMissions: this.completedMissions.length
        };
    }

    // Özel yetenekler
    useSpecialAbility() {
        if (!this.characterClass) return false;

        switch (this.characterClass.specialAbility) {
            case 'manipulation':
                // Sosyal mühendislik başarı şansını artır
                return { type: 'success', message: 'Manipülasyon yeteneği kullanıldı!' };
            case 'system_analysis':
                // Sistem analizi başarı şansını artır
                return { type: 'success', message: 'Sistem analizi yeteneği kullanıldı!' };
            case 'planning':
                // Planlama başarı şansını artır
                return { type: 'success', message: 'Planlama yeteneği kullanıldı!' };
            default:
                return { type: 'error', message: 'Özel yetenek bulunamadı!' };
        }
    }
} 