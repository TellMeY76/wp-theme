document.addEventListener('DOMContentLoaded', function() {
        const qaItems = document.querySelectorAll('.qa-item');
        const qaToggles = document.querySelectorAll('.qa-toggle');

        qaItems.forEach(function(qaItem) {
            const toggleButton = qaItem.querySelector('.qa-toggle');
            const answer = qaItem.querySelector('.qa-answer');
            let isOpen = false;

                toggleButton.addEventListener('click', function() {
                        // 关闭所有其他答案
                        qaItems.forEach(function(item) {
                                if (item !== qaItem) {
                                    const otherAnswer = item.querySelector('.qa-answer');
                                    otherAnswer.style.maxHeight = 0;
                                    item.classList.remove('qa-toggle-active'); // 移除active类
                                }
                            });

                        // 切换当前答案的展开状态
                    if (!isOpen) {
                        answer.style.maxHeight = 'unset';
                        isOpen = true;
                        toggleButton.parentElement.classList.add('qa-toggle-active'); // 添加active类
                    } else {
                        answer.style.maxHeight = 0;
                        isOpen = false;
                        console.log('toggleButton.parentElement.classList', toggleButton.parentElement.classList);
                        toggleButton.parentElement.classList.remove('qa-toggle-active'); // 移除active类
                    }
                });
            });
    });