$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html =  `<div class="message-items" data-message-id=${message.id}>
                    <div class="message-items__top-items">
                      <div class="message-items__top-items__name">
                        ${message.user_name}
                      </div>
                      <div class="message-items__top-items__time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-items__message">
                      <p class="message-items__message__content">
                        ${message.content}
                      </p>
                    </div>
                    <img src=${message.image} >
                  </div>`
      return html;
    } else {
      var html =  `<div class="message-items" data-message-id=${message.id}>
                    <div class="message-items__top-items">
                      <div class="message-items__top-items__name">
                        ${message.user_name}
                      </div>
                      <div class="message-items__top-items__time">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-items__message">
                      <p class="message-items__message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.bottom-items__button__btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.bottom-items__button__btn').prop("disabled", false);
    });
  })
})