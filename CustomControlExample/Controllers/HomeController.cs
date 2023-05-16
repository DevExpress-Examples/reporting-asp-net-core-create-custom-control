using Microsoft.AspNetCore.Mvc;

namespace Reporting_AspNetCore_Create_Custom_Control.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            Models.ReportDesignerModel model = new Models.ReportDesignerModel();
            return View(model);
        }
    }
}
