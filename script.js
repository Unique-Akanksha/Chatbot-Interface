
$(document).ready(function () {
  $('#start-chat').click(function () {
    const question = $('#question').val().trim();
    if (question) {
      $('#dashboard').hide();
      $('#chat-section').fadeIn();
      appendMessage('user', question);
      setTimeout(() => {
        appendMessage('bot', 'Thank you! Let me help you with that...');
      }, 1000);
    }
  });

  $('#send-chat').click(function () {
    const msg = $('#chat-input').val().trim();
    if (msg) {
      appendMessage('user', msg);
      $('#chat-input').val('');
      setTimeout(() => {
        appendMessage('bot', 'This is a simulated response.');
      }, 1000);
    }
  });
  $('#image-upload').on('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        appendMessage('user', '<img src="' + e.target.result + '" class="uploaded-img" />');
        setTimeout(() => {
          appendMessage('bot', 'Nice image! Let me see what I can do with it...');
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  });
  function appendMessage(sender, text) {
    const msgHTML = '<div class="message ' + sender + '"><div class="bubble">' + text + '</div></div>';
    $('#chat-window').append(msgHTML);
    $('#chat-window').scrollTop($('#chat-window')[0].scrollHeight);
  }

  $('#toggle-sidebar').click(function () {
    $('#sidebar').toggle();
  });
  $('#chat-input').keypress(function (e) {
    if (e.which === 13) {
      e.preventDefault();
      $('#send-chat').click();
    }
  }); $('#question').on('keypress', function (e) {
    if (e.which === 13) {
      $('#start-chat').click();
    }
  });
  function previewImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      $('#chat-window').append(
        `<div class="chat-message user"><img src="${e.target.result}" style="max-width: 200px;"/></div>`
      );
    };
    reader.readAsDataURL(file);
  }

  $('#chat-image-upload').on('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      previewImage(file);
    }
  });

  $('#new-chat').click(function () {
    $('#chat-window').empty();
    $('#question').val('');
    $('#chat-input').val('');

    $('#chat-section').hide();
    $('#dashboard').fadeIn();
  });
});